import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          {/* <img src="./logo1.png" alt="Logo" width={120} /> */}
          <Link className='navbar__top__logo__link' to='/'><img src="./logo1.png" alt="logo" width={100} /></Link>
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">123 ABC Bulding Ernakulam, pin : 985426, Kerala, India</span>
          <div className="flexCenter f-menu">
            <span className="secondaryText">Property</span>
            <span className="secondaryText">Services</span>
            <span className="secondaryText">Product</span>
            <span className="secondaryText">About Us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
