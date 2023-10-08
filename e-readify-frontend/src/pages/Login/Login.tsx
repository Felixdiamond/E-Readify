import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  const redirectToRoot = () => {
    navigate("/");
  };

  //   return (
  //     <div className="login-container">
  //       <h2>Login</h2>
  //       <form onSubmit={handleSubmit}>
  //         <input
  //           type="email"
  //           placeholder="Email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //         <input
  //           type="password"
  //           placeholder="Password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //         <button type="submit">Log In</button>
  //       </form>
  //     </div>
  //   );

  return (
    <div className="wrapper">
      <div className="login-container">
        <div className="login-header">
          <div className="logo-left">
            <div className="image-used">
              <span className="text-white logo-text">
                <span className="funfont">E</span>-Readify
              </span>
            </div>
            <div className="under-logo-text">
              <span className="text-white">Login to your account</span>
            </div>
          </div>
          <div className="close-right">
            <Button
              variant="outline"
              className="close-btn"
              onClick={redirectToRoot}
            >
              Close
            </Button>
          </div>
        </div>
        <div className="login-form-container">
          <form className="login-form">
            <div className="grid w-full max-w-sm items-center gap-1.5 login-group">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="ayane@senpai.com" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 login-group">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="ayane123_" />
            </div>
            <div className="forgot-pass-txt">
              <NavLink
                to="/forgot-password"
                className="text-white font-semibold text-sm forgot-pass-link"
              >
                Forgot Password
              </NavLink>
            </div>
            <div className="login-btn-div">
              <Button variant="outline" className="login-btn-login">
                Login
              </Button>
            </div>
            <div className="sign-up-instead">
              <span className="text-black font-medium text-sm">
                Don't have an account?{" "}
                <NavLink
                  to="/signup"
                  className="text-white sign-up-link-login font-semibold"
                >
                  Sign Up
                </NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
