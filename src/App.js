import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Components/Home/Home";
import Email from "./Components/Email/Email";
import About from "./Components/AboutUs/AboutUs";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import NotFound from "./Components/NotFound/NotFound";
import { Toaster } from 'react-hot-toast';

function App() {
 
  return (
    <>

      <Navbar />
      <Toaster />
      <Routes>
        
        <Route path='/' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chatbot' element={<Home />} />
        <Route path='/emailGenerator' element={<Email />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    </>
  );
}

export default App;
