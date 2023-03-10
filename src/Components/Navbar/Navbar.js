import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/Image/metalogo.jpeg";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


const auth = getAuth();
const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        setUser(user);
      } else {
        setUser({});
      }
    });
  }, [])

  const handleSignOut = () => {

    signOut(auth).then(() => {

      // Sign-out successful.
      navigate("/login")
    }).catch((error) => {
      // An error happened.
    });

  }

  return (

      <nav>
        <div className='logo'>
          <NavLink
            className="link"
            to='/'
          >
            <div class="logo" style={{ cursor: "pointer" }} >
              <img src={Logo} alt='' width="36px" height="36px" />
              <h2>MetaViral Bot</h2>
            </div>
          </NavLink>

        </div>

          <div className='link-container'>
            <NavLink
              className={({ isActive }) => (isActive ? "active-link nav_menu_item" : "link nav_menu_item")}
              to='/'
            >
              Home
            </NavLink>
            {user?.uid ?
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "link")}
                to='/chatbot'
              >
                Chatbot
              </NavLink>
              : ""}
            {user?.uid ?
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "link")}
                to='/emailGenerator'
              >
                Email generator
              </NavLink>
              : ""}

            {user?.uid ?
              <button className="logout-button" onClick={handleSignOut}>Logout</button>

              : <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "link")}
                to='/login'
              >
                Login
              </NavLink>}
            {/* <span className="margin-left">
          {user?.displayName ? user.displayName : user.email}
        </span> */}
          </div>

      </nav>
  );
};

export default Navbar;
