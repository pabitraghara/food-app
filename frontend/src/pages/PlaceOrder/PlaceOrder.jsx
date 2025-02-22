import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import storeContext from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const PlaceOrder = () => {
  const { cartItem, token, food_list, getTotalCartAmount, url } =
    useContext(storeContext);
    
    const navigate = useNavigate()

  const [totalAmount, setTotalAmount] = useState(0);

  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandeler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  // Recalculate total amount whenever cartItem changes
  useEffect(() => {
    const calculateTotal = async () => {
      const total = await getTotalCartAmount(); // Ensure this returns a number
      setTotalAmount(total);
    };

    calculateTotal();
  }, [cartItem, getTotalCartAmount]);

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItem = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItem.push(itemInfo);
      }
    });

    const deliveryFee = 2;
    const totalOrderAmount = totalAmount + deliveryFee; // This ensures totalOrderAmount is a number

    let orderData = {
      address: data,
      items: orderItem,
      amount: totalOrderAmount, // Now using the correct total amount
    };

    // console.log(orderItem)
    // let orderData = {
    //   address:data,
    //   items:orderItem,
    //   amount:getTotalCartAmount()+2,

    // }
    console.log(orderData);
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    console.log(" vvb vbbv", response);

    if (response.data.success) {
      const { session_url } = response.data;
      // Redirect to the Stripe session URL
      window.location.replace(session_url);
    } else {
      // Display a more detailed error message
      console.error(
        "Order placement failed:",
        response.data.message || "Unknown error"
      );
      alert(`Error : ${response.data.message || "Something went wrong"}`);
    }
  };

  

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              name="firstName"
              onChange={onChangeHandeler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              name="lastName"
              onChange={onChangeHandeler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <input
            name="email"
            onChange={onChangeHandeler}
            value={data.email}
            type="email"
            placeholder="Enter Email"
            required
          />
          <input
            name="street"
            onChange={onChangeHandeler}
            value={data.street}
            type="text"
            placeholder="Street"
            required
          />
          <div className="multi-fields">
            <input
              name="city"
              onChange={onChangeHandeler}
              value={data.city}
              type="text"
              placeholder="City"
              required
            />
            <input
              name="state"
              onChange={onChangeHandeler}
              value={data.state}
              type="text"
              placeholder="State"
              required
            />
          </div>
          <div className="multi-fields">
            <input
              name="zipcode"
              onChange={onChangeHandeler}
              value={data.zipcode}
              type="text"
              placeholder="Zip Code"
              required
            />
            <input
              name="country"
              onChange={onChangeHandeler}
              value={data.country}
              type="text"
              placeholder="Country"
              required
            />
          </div>
          <input
            name="phone"
            onChange={onChangeHandeler}
            value={data.phone}
            type="text"
            placeholder="Phone"
            required
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${totalAmount}</p>
              </div>

              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${totalAmount === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${totalAmount === 0 ? 0 : totalAmount + 2}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
