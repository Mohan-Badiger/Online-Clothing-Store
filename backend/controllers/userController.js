import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Helper function to create JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email }).lean();
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        return res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill in all fields" });
        }

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            cartData: {}
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        return res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser };
