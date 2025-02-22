import React, { useState, useEffect } from "react";
import StoreContext from "./StoreContext";
import { food_list } from "../assets/assets";

import axios from 'axios'


const StoreStateProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const url = "http://localhost:7042";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);



  const addToCart = async (itemId) => {
    const updatedCart = { ...cartItem, [itemId]: (cartItem[itemId] || 0) + 1 };
    setCartItem(updatedCart);

    if (token) {
      await axios.post(`${url}/api/cart/addcart`, { itemId }, { headers: { token } });
      await loadCartData(token); // Re-fetch cart to stay in sync
    }
  };

  const removeFromCart = async (itemId) => {
    if (cartItem[itemId] > 1) {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      const updatedCart = { ...cartItem };
      delete updatedCart[itemId]; // Remove item if quantity is 0
      setCartItem(updatedCart);
    }

    if (token) {
      await axios.post(`${url}/api/cart/removecart`, { itemId }, { headers: { token } });
      await loadCartData(token); // Re-fetch cart to stay in sync
    }
  };


  const getTotalCartAmount = async () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        totalAmount += (itemInfo?.price || 0) * cartItem[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/getcart`, {}, { headers: { token } });
      setCartItem(response.data.cart || {}); // Update cart items
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken); // Load cart data with saved token
      }
    }
    loadData();
  }, []);

  //relode the web page but not loged out
  // useEffect(() => {
  //   if(localStorage.getItem("token")){
  //     setToken(localStorage.getItem("token"))
  //   }
  //   async function loadData() {
  //     await fetchFoodList()
  //   }
  // }, [])
  

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreStateProvider;