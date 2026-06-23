/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { imageMap } from "../assets/assets";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 49;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const backendUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

    // Products list loaded from the database
    const [products, setProducts] = useState([]);

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

    // Orders state loaded from backend
    const [orders, setOrders] = useState([]);

    // Load initial auth token from localStorage
    const [token, setToken] = useState(() => {
        try {
            return localStorage.getItem("token") || "";
        } catch {
            return "";
        }
    });

    // Fetch products list from backend
    const getProductsData = useCallback(async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                const mapped = response.data.products.map(item => ({
                    ...item,
                    image: item.image.map(imgName => imageMap[imgName] || imgName)
                }));
                setProducts(mapped);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Fetch products error:", error);
            toast.error("Failed to load products from server. Make sure backend is running.");
        }
    }, [backendUrl]);

    // Fetch user cart data
    const getUserCart = useCallback(async (authToken) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token: authToken } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error("Get user cart error:", error);
        }
    }, [backendUrl]);

    // Fetch user orders list
    const getUserOrders = useCallback(async (authToken) => {
        try {
            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token: authToken } });
            if (response.data.success) {
                const mappedOrders = response.data.orders.map(order => ({
                    ...order,
                    items: order.items.map(item => ({
                        ...item,
                        image: item.image.map(imgName => imageMap[imgName] || imgName)
                    }))
                }));
                setOrders(mappedOrders);
            }
        } catch (error) {
            console.error("Get user orders error:", error);
        }
    }, [backendUrl]);

    // Sync local storage cart to database
    const syncLocalCartWithDB = useCallback(async (authToken) => {
        try {
            const savedCart = localStorage.getItem("cartItems");
            const localCart = savedCart ? JSON.parse(savedCart) : {};

            const response = await axios.post(
                backendUrl + '/api/cart/sync',
                { cartItems: localCart },
                { headers: { token: authToken } }
            );

            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error("Cart sync failed:", error);
        }
    }, [backendUrl]);

    // Initialize products load
    useEffect(() => {
        getProductsData();
    }, [getProductsData]);

    // Load cart & orders when token changes
    useEffect(() => {
        if (token) {
            getUserCart(token);
            getUserOrders(token);
        } else {
            // Load cart from local storage when logged out
            try {
                const savedCart = localStorage.getItem("cartItems");
                setCartItems(savedCart ? JSON.parse(savedCart) : {});
            } catch {
                setCartItems({});
            }
            setOrders([]);
        }
    }, [token, getUserCart, getUserOrders]);

    const login = useCallback(async (email, password) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/login', { email, password });
            if (response.data.success) {
                const tokenVal = response.data.token;
                setToken(tokenVal);
                localStorage.setItem("token", tokenVal);
                toast.success("Logged In Successfully!");
                await syncLocalCartWithDB(tokenVal);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Login failed");
        }
    }, [backendUrl, navigate, syncLocalCartWithDB]);

    const register = useCallback(async (name, email, password) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
            if (response.data.success) {
                const tokenVal = response.data.token;
                setToken(tokenVal);
                localStorage.setItem("token", tokenVal);
                toast.success("Account Created Successfully!");
                await syncLocalCartWithDB(tokenVal);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Registration failed");
        }
    }, [backendUrl, navigate, syncLocalCartWithDB]);

    const logout = useCallback(() => {
        setToken("");
        localStorage.removeItem("token");
        setCartItems({});
        setOrders([]);
        toast.success("Logged Out Successfully!");
        navigate("/login");
    }, [navigate]);

    const addToCart = useCallback(async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        setCartItems(prev => {
            let cartData = structuredClone(prev);
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                } else {
                    cartData[itemId][size] = 1;
                }
            } else {
                cartData[itemId] = {};
                cartData[itemId][size] = 1;
            }
            return cartData;
        });

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    }, [token, backendUrl]);

    const getCartCount = useCallback(() => {
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
    }, [cartItems]);

    const updateQuantity = useCallback(async (itemId, size, quantity) => {
        setCartItems(prev => {
            let cartData = structuredClone(prev);
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            cartData[itemId][size] = quantity;
            
            if (quantity <= 0) {
                delete cartData[itemId][size];
            }
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
            return cartData;
        });

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    }, [token, backendUrl]);

    const productsMap = useMemo(() => {
        return new Map(products.map(product => [product._id, product]));
    }, [products]);

    const getCartAmount = useCallback(() => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = productsMap.get(items);
            if (!itemInfo) continue;
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return totalAmount;
    }, [cartItems, productsMap]);

    const placeOrder = useCallback(async (address, method) => {
        if (!token) {
            toast.error("Please login to place an order");
            return false;
        }

        try {
            const response = await axios.post(
                backendUrl + '/api/order/place',
                { address, method },
                { headers: { token } }
            );

            if (response.data.success) {
                setCartItems({});
                toast.success("Order Placed Successfully!");
                getUserOrders(token); // refresh orders list
                return true;
            } else {
                toast.error(response.data.message);
                return false;
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            return false;
        }
    }, [token, backendUrl, getUserOrders]);

    const value = useMemo(() => ({
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount, navigate,
        orders, placeOrder,
        token, login, register, logout
    }), [
        products, currency, delivery_fee,
        search, showSearch, cartItems, addToCart,
        getCartCount, updateQuantity, getCartAmount, navigate,
        orders, placeOrder, token, login, register, logout
    ]);

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