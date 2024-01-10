import React, { useState,Fragment } from "react";
import {Link, NavLink,useNavigate } from 'react-router-dom'

import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector, useDispatch } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import {clearAuth} from "../../redux/userSlice";
import Cookies from 'js-cookie';


const Header = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [menuOpened, setMenuOpened] = useState(true);
  const headerColor = useHeaderColor();
  const user = useSelector((state)=>state.user);
  // console.log("_____---_____---_________",user)
  // const checkuser1 = ()=>{console.log("Checking User : ",user.user.username)}
  const userLogout =()=>{
    Cookies.remove('accessToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(clearAuth());
    navigator('/');
  }
  // const logoutUser = e => {
  //   e.preventDefault();}

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link className='navbar__top__logo__link' to='/'><img src="./logo1.png" alt="logo" width={100} /></Link>

        {/* <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input type="text" />
            <button className="button">Search</button>
        </div> */}

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(true);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >

          <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input  type="text" />
            <button className="button">Search</button>
          </div>


            {/* <a href="#residencies">Residencies</a>
            <a href="#value">Our Value</a>
            <a href="#contact-us">Contact Us</a>
            <a href="#get-started">Get Started</a>
            <button className="button">
              <a href="mailto:zainkeepscode@gmail.com">Contact</a>
            </button> */}
            <Fragment>
              <NavLink className='navbar__bottom__item' exact to='/'>Home</NavLink>
              <NavLink className='navbar__bottom__item'  to='/residencies'>Residencies</NavLink>
              <NavLink className='navbar__bottom__item'  to='/sell'>Sell</NavLink>
              {/* <NavLink className='navbar__bottom__item' onClick={checkuser1}>Check</NavLink> */}
              {user.isAuthenticated ?  (
                <Link className='navbar__bottom__item' onClick={userLogout}>Logout</Link>
              ) : (
                <Fragment>
                <NavLink className='navbar__bottom__item' to='/login'>Sign In</NavLink>
                <NavLink className='navbar__bottom__item' to='/signup'>Sign Up</NavLink>
              </Fragment>
              )}
            </Fragment>
             {/* {user.isAuthenticated ?  (
              <Fragment>
                <NavLink className='navbar__bottom__item' exact to='/'>Home</NavLink>
                <NavLink className='navbar__bottom__item'  to='/residencies'>Residencies</NavLink>
                <NavLink className='navbar__bottom__item'  to='/sell'>Sell</NavLink>
                <NavLink className='navbar__bottom__item'  to=''>{checkuser}</NavLink>
                <NavLink className='navbar__bottom__item' onClick={checkuser}>Logout</NavLink>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink className='navbar__bottom__item' exact to='/'>Home</NavLink>
                <NavLink className='navbar__bottom__item'  to='/residencies'>Residencies</NavLink>
                <NavLink className='navbar__bottom__item'  to='/sell'>Sell</NavLink>
                <NavLink className='navbar__bottom__item'  to='/login'>Sign In</NavLink>
                <NavLink className='navbar__bottom__item'  to='/signup'>Sign Up</NavLink>
              </Fragment>
            )} */}
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
