import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./Components/Home/Home";
import Email from "./Components/Email/Email";
import About from "./Components/AboutUs/AboutUs";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import NotFound from "./Components/NotFound/NotFound";
import { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const auth = getAuth();
function App() {
  const navigate = useNavigate();
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
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='/' element={<About />} />
        <Route
          exact
          path="/chatbot"
          element={
            user.uid ? (
              <Home />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        />
        <Route
          exact
          path="/emailGenerator"
          element={
            user.uid ? (
              <Email />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        />
        {/* <Route path='/about' element={<About />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </>
  );
}

export default App;
