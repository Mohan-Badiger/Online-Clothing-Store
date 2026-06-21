import mongoose from "mongoose";
import "dotenv/config";
import productModel from "./models/productModel.js";
import connectDB from "./config/db.js";

const productsToSeed = [
    {
        _id: "aaaaa",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 500,
        image: ["p_img1"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "aaaab",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 649,
        image: ["p_img2_1", "p_img2_2", "p_img2_3", "p_img2_4"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaac",
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 549,
        image: ["p_img3"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        date: 1716234545448,
        bestseller: true
    },
    {
        _id: "aaaad",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 239,
        image: ["p_img4"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "XXL"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaae",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 399,
        image: ["p_img5"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716622345448,
        bestseller: true
    },
    {
        _id: "aaaaf",
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 599,
        image: ["p_img6"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        date: 1716623423448,
        bestseller: true
    },
    {
        _id: "aaaag",
        name: "Men Tapered Fit Flat-Front Trousers",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 799,
        image: ["p_img7"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "L", "XL"],
        date: 1716621542448,
        bestseller: false
    },
    {
        _id: "aaaah",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 599,
        image: ["p_img8"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716622345448,
        bestseller: false
    },
    {
        _id: "aaaai",
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 699,
        image: ["p_img9"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716621235448,
        bestseller: false
    },
    {
        _id: "aaaaj",
        name: "Men Tapered Fit Flat-Front Trousers",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 239,
        image: ["p_img10"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "L", "XL"],
        date: 1716622235448,
        bestseller: false
    },
    {
        _id: "aaaak",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 699,
        image: ["p_img11"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716623345448,
        bestseller: false
    },
    {
        _id: "aaaal",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 450,
        image: ["p_img12"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716624445448,
        bestseller: false
    },
    {
        _id: "aaaam",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 399,
        image: ["p_img13"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716625545448,
        bestseller: false
    },
    {
        _id: "aaaan",
        name: "Boy Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 549,
        image: ["p_img14"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716626645448,
        bestseller: false
    },
    {
        _id: "aaaao",
        name: "Men Tapered Fit Flat-Front Trousers",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 599,
        image: ["p_img15"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716627745448,
        bestseller: false
    },
    {
        _id: "aaaap",
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 420,
        image: ["p_img16"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716628845448,
        bestseller: false
    },
    {
        _id: "aaaaq",
        name: "Men Tapered Fit Flat-Front Trousers",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 450,
        image: ["p_img17"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716669945448,
        bestseller: false
    },
    {
        _id: "aaaar",
        name: "Boy Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 490,
        image: ["p_img18"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716631045448,
        bestseller: false
    },
    {
        _id: "aaaas",
        name: "Boy Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 549,
        image: ["p_img19"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716632145448,
        bestseller: false
    },
    {
        _id: "aaaat",
        name: "Women Palazzo Pants with Waist Belt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 799,
        image: ["p_img20"],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716633245448,
        bestseller: false
    },
    {
        _id: "aaaau",
        name: "Women Zip-Front Relaxed Fit Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 420,
        image: ["p_img21"],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716634345448,
        bestseller: false
    },
    {
        _id: "aaaav",
        name: "Women Palazzo Pants with Waist Belt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 649,
        image: ["p_img22"],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716635445448,
        bestseller: false
    },
    {
        _id: "aaaaw",
        name: "Boy Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 490,
        image: ["p_img23"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716636545448,
        bestseller: false
    },
    {
        _id: "aaaax",
        name: "Boy Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 210,
        image: ["p_img24"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716637645448,
        bestseller: false
    },
    {
        _id: "aaaay",
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 799,
        image: ["p_img25"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716638745448,
        bestseller: false
    },
    {
        _id: "aaaaz",
        name: "Women Zip-Front Relaxed Fit Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 549,
        image: ["p_img26"],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716639845448,
        bestseller: false
    },
    {
        _id: "aaaba",
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 649,
        image: ["p_img27"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716640945448,
        bestseller: false
    },
    {
        _id: "aaabb",
        name: "Men Slim Fit Relaxed Denim Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 230,
        image: ["p_img28"],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716642045448,
        bestseller: false
    },
    {
        _id: "aaabc",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 210,
        image: ["p_img29"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716643145448,
        bestseller: false
    },
    {
        _id: "aaabd",
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 399,
        image: ["p_img30"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716644245448,
        bestseller: false
    },
    {
        _id: "aaabe",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 549,
        image: ["p_img31"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716645345448,
        bestseller: false
    },
    {
        _id: "aaabf",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 250,
        image: ["p_img32"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716646445448,
        bestseller: false
    },
    {
        _id: "aaabg",
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 230,
        image: ["p_img33"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716647545448,
        bestseller: false
    },
    {
        _id: "aaabh",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 260,
        image: ["p_img34"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716648645448,
        bestseller: false
    },
    {
        _id: "aaabi",
        name: "Women Zip-Front Relaxed Fit Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 399,
        image: ["p_img35"],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716649745448,
        bestseller: false
    },
    {
        _id: "aaabj",
        name: "Women Zip-Front Relaxed Fit Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 270,
        image: ["p_img36"],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716650845448,
        bestseller: false
    },
    {
        _id: "aaabk",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 250,
        image: ["p_img37"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716651945448,
        bestseller: false
    },
    {
        _id: "aaabl",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 280,
        image: ["p_img38"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716653045448,
        bestseller: false
    },
    {
        _id: "aaabm",
        name: "Men Printed Plain Cotton Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 260,
        image: ["p_img39"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716654145448,
        bestseller: false
    },
    {
        _id: "aaabn",
        name: "Men Slim Fit Relaxed Denim Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 290,
        image: ["p_img40"],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716655245448,
        bestseller: false
    },
    {
        _id: "aaabo",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 270,
        image: ["p_img41"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716656345448,
        bestseller: false
    },
    {
        _id: "aaabp",
        name: "Boy Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 300,
        image: ["p_img42"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716657445448,
        bestseller: false
    },
    {
        _id: "aaabq",
        name: "Kid Tapered Slim Fit Trouser",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 280,
        image: ["p_img43"],
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716658545448,
        bestseller: false
    },
    {
        _id: "aaabr",
        name: "Women Zip-Front Relaxed Fit Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 310,
        image: ["p_img44"],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716659645448,
        bestseller: false
    },
    {
        _id: "aaabs",
        name: "Men Slim Fit Relaxed Denim Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 290,
        image: ["p_img45"],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716660745448,
        bestseller: false
    },
    {
        _id: "aaabt",
        name: "Men Slim Fit Relaxed Denim Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 320,
        image: ["p_img46"],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716661845448,
        bestseller: false
    },
    {
        _id: "aaabu",
        name: "Kid Tapered Slim Fit Trouser",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 300,
        image: ["p_img47"],
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716662945448,
        bestseller: false
    },
    {
        _id: "aaabv",
        name: "Men Slim Fit Relaxed Denim Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 330,
        image: ["p_img48"],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716664045448,
        bestseller: false
    },
    {
        _id: "aaabw",
        name: "Kid Tapered Slim Fit Trouser",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 310,
        image: ["p_img49"],
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716665145448,
        bestseller: false
    },
    {
        _id: "aaabx",
        name: "Kid Tapered Slim Fit Trouser",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 340,
        image: ["p_img50"],
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716666245448,
        bestseller: false
    },
    {
        _id: "aaaby",
        name: "Women Zip-Front Relaxed Fit Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 320,
        image: ["p_img51"],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716667345448,
        bestseller: false
    },
    {
        _id: "aaabz",
        name: "Men Slim Fit Relaxed Denim Jacket",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 350,
        image: ["p_img52"],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716668445448,
        bestseller: false
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();
        
        // Clear existing products
        console.log("Clearing existing products...");
        await productModel.deleteMany({});
        
        // Insert initial products
        console.log("Seeding products...");
        await productModel.insertMany(productsToSeed);
        
        console.log("Seeding completed successfully!");
        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedDatabase();
