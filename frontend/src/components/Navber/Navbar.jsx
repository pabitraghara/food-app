import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import storeContext from "../../context/StoreContext";

export const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("");

  const onClickMenu = (menuItem) => {
    setMenu(menuItem);
  };
  const {getTotalCartAmount,token,setToken} = useContext(storeContext)

  const navigate = useNavigate()
  const logout = ()=>{
   localStorage.removeItem("token");
   setToken("")
    navigate("/")
  }

  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} className="logo" alt="Logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to='/'
          onClick={() => onClickMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a href="#explore-menu"
          onClick={() => onClickMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a href="#app-download"
          onClick={() => onClickMenu("Mobile-App")}
          className={menu === "Mobile-App" ? "active" : ""}
        >
          Mobile-App
        </a>
        <a href="#footer"
          onClick={() => onClickMenu("Contact Us")}
          className={menu === "Contact Us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="Basket Icon" />
          </Link>
          <div  className={getTotalCartAmount() === 0? "":"dot"}>
          </div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)} >Sign In</button>:<div className="navbar-profile">
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorder')}>
              <img src={assets.bag_icon} alt="" /><p>Orders</p>
            </li>
            <hr />
            <li onClick={logout}>
              <img src={assets.logout_icon} alt="" /><p>Logout</p>
            </li>
          </ul>
          </div>}
        
      </div>
    </div>
  );
};

export default Navbar;
