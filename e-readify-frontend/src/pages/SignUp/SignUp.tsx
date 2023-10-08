import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const redirectToRoot = () => {
    navigate("/");
  };

  const flipCard = (e) => {
    e.preventDefault()
    setIsFlipped(!isFlipped);
  };

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
              <span className="text-white">Register to enjoy the features</span>
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
          <form className="cardd login-form">
            <div className={`form-front ${isFlipped ? 'is-flipped' : ''}`}>
              <div className="grid w-full max-w-sm items-center gap-1.5 login-group">
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" placeholder="Itachi Uchiha" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 login-group">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="ayane@senpai.com" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 login-group">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="ayane123_" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 login-group">
                <Label htmlFor="upload">Upload a Picture</Label>
                <Input id="picture" type="file" />
              </div>
              <div className="login-btn-div">
                <Button variant="outline" className="login-btn-login" onClick={flipCard}>
                  <div className="flex items-center">
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
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
            </div>
            <div className={`form-back cardd ${isFlipped ? 'is-flipped' : ''}`}>
                Back :)
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
