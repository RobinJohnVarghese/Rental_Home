import React, { useState,Fragment } from "react";
import { Link,NavLink, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {clearAdminAuth} from '../../redux/AdminSlice'
import "./AdminHeader.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import Cookies from 'js-cookie';



function AdminHeader() {
  const adminUser = useSelector(state => state.admin);
  console.log(adminUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(true);
  const headerColor = useHeaderColor();

  const logout = () =>{
    Cookies.remove('accessToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(clearAdminAuth());
    navigate('/admin');
    
  
  }
  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link className='navbar__top__logo__link' to='/Admin'><img src="./logo1.png" alt="logo" width={100} /></Link>

        {/* menu */}
        <OutsideClickHandler onOutsideClick={() => { setMenuOpened(true); }} >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)} >

            <Fragment>
              <NavLink className='navbar__bottom__item' exact to='/Admin'>Admin Home</NavLink>
              <NavLink className='navbar__bottom__item'  to='/admin-postmanagement'>Posts Management</NavLink>
              <NavLink className='navbar__bottom__item'  to='/Admin-usermanagement'>User Management</NavLink>
              {adminUser.isAdminAuthenticated ? (
                <Link className='navbar__bottom__item' onClick={logout}>Logout</Link>
              ) : (
                <Fragment>
                <NavLink className='navbar__bottom__item' to='/admin-login'>Admin Sign In</NavLink>              
                </Fragment>
              )}
            </Fragment>

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

export default AdminHeader