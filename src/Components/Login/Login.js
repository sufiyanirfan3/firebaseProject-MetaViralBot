import React from "react";
import "./AuthForm.css";
import facebook from "../../Assets/Image/facebook.png"
import GoogleLogo from "../../Assets/Image/google.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import app from "../../firebase.init";

import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);


const Login = () => {
  const navigate = useNavigate();
  const googleAuth = () => {

    signInWithPopup(auth, googleProvider)
      .then((result) => {
         const user = result.user
        navigate('/chatbot');
        toast.success("You are logged in", { id: 'ok' })
      }).catch((error) => {
        const errorMessage = error.message;
      });
  }

  // const facebookAuth = () => {
  //   signInWithPopup(auth, facebookProvider)
  //     .then((result) => {
  //       // The signed-in user info.
  //       const user = result.user;
  //       navigate('/home')
  //       console.log(user)
  //       toast.success("You are logged in", { id: 'ok' })
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       if (errorMessage.includes("auth/account-exists-with-different-credential")) {
  //         toast.error("The account already exists  with different provider.", { id: 'error' })
  //       }
  //       console.log(errorMessage)
  //     });
  // }

  const handleFormLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;


    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/chatbot')
        toast.success("You are logged in", { id: 'ok' })
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("Error (auth/wrong-password)")) {
          toast.error("Email or password is wrong", { id: 'error' })
        }
        else if (errorMessage.includes("Error (auth/user-not-found)")) {
          toast.error("User not found", { id: 'error' })
        }

        console.log(errorMessage);
      });
  }
  return (
    <div className='auth-form-container '>
      <div className='auth-form'>
        <h1>Login</h1>
        <form onSubmit={handleFormLogin}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <div className='input-wrapper'>
              <input type='text' name='email' id='email' />
            </div>
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <div className='input-wrapper'>
              <input type='password' name='password' id='password' />
            </div>
          </div>
          <button type='submit' className='auth-form-submit'>
            Login
          </button>
        </form>
        <p className='redirect'>
          New User?{" "}
          <span onClick={() => navigate("/signup")}>Create New Account</span>
        </p>
        <div className='horizontal-divider'>
          <div className='line-left' />
          <p>or</p>
          <div className='line-right' />
        </div>
        <div className='input-wrapper'>
          <button className='google-auth' onClick={googleAuth}>
            <img src={GoogleLogo} alt='' />
            <p> Continue with Google </p>
          </button>
        </div>
        {/* <div className='input-wrapper  mt'>
          <button className='google-auth' onClick={facebookAuth}>
            <img className="fb-img" src={facebook} alt='' />
            <p> Continue with Facebook</p>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
