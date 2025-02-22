// import React, { useContext, useEffect, useState } from "react";
// import "./Cart.css";
// import storeContext from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";

// export const Cart = () => {
//   const { cartItem, food_list, removeFromCart, getTotalCartAmount, url } = useContext(storeContext);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const navigate = useNavigate();

//   // Recalculate total cart amount whenever cartItem changes
//   useEffect(() => {
//     const calculateTotal = async () => {
//       const total = await getTotalCartAmount();
//       setTotalAmount(total);
//     };

//     calculateTotal();
//   }, [cartItem, getTotalCartAmount]);

//   return (
//     <div className="cart">
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Item</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />

//         {food_list.map((item) => {
//           if (cartItem[item._id] > 0) {
//             return (
//               <React.Fragment key={item._id}>
//                 <div className="cart-items-title cart-items-item">
//                   <img src={`${url}/images/${item.image}`}  />
//                   <p>{item.name}</p>
//                   <p>${item.price}</p>
//                   <p>{cartItem[item._id]}</p>
//                   <p>${item.price * cartItem[item._id]}</p>
//                   <p
//                     onClick={() => removeFromCart(item._id)}
//                     className="cross"
//                   >
//                     X
//                   </p>
//                 </div>
//                 <hr />
//               </React.Fragment>
//             );
//           }
//           return null;
//         })}
//       </div>

//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>${totalAmount}</p>
//             </div>

//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${totalAmount === 0 ? 0 : 2}</p> {/* Adjust delivery fee based on subtotal */}
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${totalAmount === 0 ? 0 : totalAmount + 2}</b> {/* Total with delivery fee */}
//             </div>
//           </div>
//           <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
//         </div>
//         <div className="cart-promovode">
//           <div>
//             <p>If you have a promo code, enter it here</p>
//             <div className="cart-promocode-input">
//               <input type="text" placeholder="Enter Promocode" />
//               <button>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import storeContext from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotalCartAmount, url } = useContext(storeContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotal = async () => {
      try {
        const total = await getTotalCartAmount();
        setTotalAmount(total);
      } catch (error) {
        console.error("Error calculating total amount:", error);
      }
    };
    calculateTotal();
  }, [cartItem, getTotalCartAmount]);

  const deliveryFee = totalAmount === 0 ? 0 : 2;

  const handlePromoSubmit = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(0.1 * totalAmount); // Applying a 10% discount
    } else {
      alert("Invalid promo code");
      setDiscount(0);
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItem[item._id] > 0) {
            return (
              <React.Fragment key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cross"
                  >
                    X
                  </p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
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
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p>-${discount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${(totalAmount + deliveryFee - discount).toFixed(2)}</b>
            </div>
          </div>
          {totalAmount > 0 && (
            <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
          )}
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter Promocode"
              />
              <button onClick={handlePromoSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
