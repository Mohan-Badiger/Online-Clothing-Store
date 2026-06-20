import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { products } from "../assets/assets";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 49;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    // Load initial cartItems from localStorage
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem("cartItems");
            return savedCart ? JSON.parse(savedCart) : {};
        } catch {
            return {};
        }
    });

    // Save cartItems to localStorage on change
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Load initial orders from localStorage
    const [orders, setOrders] = useState(() => {
        try {
            const savedOrders = localStorage.getItem("orders");
            return savedOrders ? JSON.parse(savedOrders) : [];
        } catch {
            return [];
        }
    });

    // Save orders to localStorage on change
    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    // Load initial auth token from localStorage
    const [token, setToken] = useState(() => {
        try {
            return localStorage.getItem("token") || "";
        } catch {
            return "";
        }
    });

    const login = (email, password) => {
        const mockToken = "mock-jwt-token-" + email + "-" + Date.now();
        setToken(mockToken);
        localStorage.setItem("token", mockToken);
        toast.success("Logged In Successfully!");
        navigate("/");
    };

    const register = (name, email, password) => {
        const mockToken = "mock-jwt-token-" + email + "-" + Date.now();
        setToken(mockToken);
        localStorage.setItem("token", mockToken);
        toast.success("Account Created Successfully!");
        navigate("/");
    };

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
        toast.success("Logged Out Successfully!");
        navigate("/login");
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue;
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return totalAmount;
    }

    const placeOrder = (address, method) => {
        const orderItems = [];
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    const productInfo = products.find((product) => product._id === itemId);
                    if (productInfo) {
                        orderItems.push({
                            ...productInfo,
                            size: size,
                            quantity: cartItems[itemId][size]
                        });
                    }
                }
            }
        }

        if (orderItems.length === 0) {
            toast.error("Cart is empty");
            return false;
        }

        const newOrder = {
            _id: Date.now().toString(),
            items: orderItems,
            amount: getCartAmount() + delivery_fee,
            address: address,
            status: "Order Placed",
            paymentMethod: method,
            payment: method === 'cod' ? false : true,
            date: Date.now()
        };

        setOrders(prev => [newOrder, ...prev]);
        setCartItems({});
        toast.success("Order Placed Successfully!");
        return true;
    }

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount, navigate,
        orders, placeOrder,
        token, login, register, logout
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ShopContextProvider;