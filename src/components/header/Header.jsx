import React from "react";
import "./Header.css";
import logo from "../../image/logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header1">
        <div className="sub-header1">
          <img src={logo} alt="Logo" />
        </div>
        <div className="sub-header2">
          <div className="sub-header3">
            <button className="button button1">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
