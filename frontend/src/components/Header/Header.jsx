import React, { useState,Fragment } from "react";
import {Link, NavLink,useNavigate } from 'react-router-dom'
import "./Header.css";
import { BiMenuAltRight, BiUser, BiNote, BiLogOut, BiFile, BiTab, BiArchive } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector, useDispatch } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import {clearAuth} from "../../redux/userSlice";
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '../../api/api';


const Header = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpened, setMenuOpened] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const headerColor = useHeaderColor();
  const user = useSelector((state)=>state.user);
  const userLogout =()=>{
    Cookies.remove('accessToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(clearAuth());
    navigator('/');
  }
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleSearch = async () => {
    try {
      const responses = await Promise.all([
        axios.get(`${baseURL}listings/ListingSearchView?title=${searchQuery}`),
        axios.get(`${baseURL}listings/ListingSearchView?address=${searchQuery}`),
        axios.get(`${baseURL}listings/ListingSearchView?city=${searchQuery}`),
        axios.get(`${baseURL}listings/ListingSearchView?state=${searchQuery}`)
      ]);
  
      // Combine all response data into a single array
      let searchData = responses.flatMap(response => response.data);
      // setSearchResults(responses.data);
       // Filter out duplicates
      searchData = searchData.filter((item, index, self) =>
      index === self.findIndex(t => (
        t.id === item.id // Assuming each item has a unique identifier like 'id'
        ))
      );
  
      // Save the combined data to state
      setSearchResults(searchData);
      
      navigator('/searchdatapage', { state: { searchResults } });
      console.log("#############  header searchResults", searchResults);
      console.log("#############  Results", searchData);
      console.log("#############  searchData.length", searchData.length);
      // Return the maximum length of the list
      return searchData.length;

    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle errors
    }
    // try {
    //   // const queryParams = ` title=${searchQuery}& address=${searchQuery}& city=${searchQuery}& state=${searchQuery}`;

    //   // Make an API request to your backend
    //   const response = await axios.get(`${baseURL}listings/ListingSearchView?title=${searchQuery}`);
    //   setSearchResults(response.data);
    //   console.log("#############  Results",response.data)
    // } catch (error) {
    //   console.error('Error fetching search results:', error);
    //   // Handle errors
    // }
    // try {
    //   // const queryParams = ` title=${searchQuery}& address=${searchQuery}& city=${searchQuery}& state=${searchQuery}`;

    //   // Make an API request to your backend
    //   const response = await axios.get(`${baseURL}listings/ListingSearchView?address=${searchQuery}`);
    //   setSearchResults(response.data);
    //   console.log("#############  Results",response.data)
    // } catch (error) {
    //   console.error('Error fetching search results:', error);
    //   // Handle errors
    // }
    // try {
    //   // const queryParams = ` title=${searchQuery}& address=${searchQuery}& city=${searchQuery}& state=${searchQuery}`;

    //   // Make an API request to your backend
    //   const response = await axios.get(`${baseURL}listings/ListingSearchView?city=${searchQuery}`);
    //   setSearchResults(response.data);
    //   console.log("#############  Results",response.data)
    // } catch (error) {
    //   console.error('Error fetching search results:', error);
    //   // Handle errors
    // }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link className='navbar__top__logo__link' to='/'><img src="./logo1.png" alt="logo" width={100} /></Link>


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
            <input  type="text" value={searchQuery} onChange={handleChange} />
            <button className="button" onClick={handleSearch}>Search</button>
          </div>


            <Fragment>
              <NavLink className='navbar__bottom__item' exact to='/'>Home</NavLink>
              <NavLink className='navbar__bottom__item'  to='/residencies'>Residencies</NavLink>
              <NavLink className='navbar__bottom__item'  to='/sell'>Sell</NavLink>
              <NavLink className='navbar__bottom__item'  to='/notifications'>Notifications</NavLink>
              {/* <NavLink className='navbar__bottom__item' onClick={checkuser1}>Check</NavLink> */}
              {user.isAuthenticated ?  (
                // <Link className='navbar__bottom__item' onClick={userLogout}>Logout</Link>
                <div className="navbar__bottom__item navbar__bottom__dropdown" onClick={toggleDropdown}>
                <BiUser size={30} />
                {showDropdown && (
                  <div className="navbar__dropdown-content">
                    <div>
                    <BiUser size={20} />
                    <NavLink to="/profile">Profile</NavLink>
                    </div>
                    <div>
                        <BiNote size={20} />
                        <NavLink to="/my-posts">My Posts</NavLink>
                    </div>
                    {/* <div>
                        <BiFile size={20} />
                        <NavLink to="/notificatons">Notifications</NavLink>
                    </div> */}
                    <div>
                        <BiTab size={20} />
                        <NavLink to="/membership">MemberShip</NavLink>
                    </div>
                    <div>
                        <BiArchive size={20} />
                        <NavLink to="/message">Messages</NavLink>
                    </div>
                    <div onClick={userLogout}>
                      <BiLogOut size={20} />
                      Logout
                    </div>
                  </div>
                )}
              </div>
              ) : (
                <Fragment>
                <NavLink className='navbar__bottom__item' to='/login'>Sign In</NavLink>
                <NavLink className='navbar__bottom__item' to='/signup'>Sign Up</NavLink>
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

export default Header;
