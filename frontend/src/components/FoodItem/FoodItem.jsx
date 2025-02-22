import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import storeContext from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItem, addToCart, removeFromCart, url } = useContext(storeContext);

  // Log cartItem for debugging
  console.log("Cart Items: ", cartItem);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={`${url}/images/${image}`}  />
        {/* Log the image path for debugging */}
        {/* <p>Image Path: {`${url}/images/${image}`}</p> */}

        {!cartItem[id] ? (
          <img
            className="add"
            onClick={() => {
              console.log("Adding to cart:", id); // Debug log
              addToCart(id);
            }}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => {
                console.log("Removing from cart:", id); // Debug log
                removeFromCart(id);
              }}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItem[id]}</p>
            <img
              onClick={() => {
                console.log("Adding more to cart:", id); // Debug log
                addToCart(id);
              }}
              src={assets.add_icon_green}
              alt="Add More"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
