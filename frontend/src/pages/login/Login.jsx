import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

  const submitRegisterHandler = async (event) => {
    event.preventDefault();

    if (action === "Sign Up" && !name.trim()) {
      alert("Please enter your name.");
      return;
    }

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!password.trim() || password.length < 6) {
      alert("Please enter a password of at least 6 characters.");
      return;
    }

    let firstName = name.split(" ")[0];
    let lastName = name.split(" ")[1];
    let avatarUrl = "test123"
    let favorites = ["action", "shonen", "romance", "comedy", "drama"]

    try {
      const { data } = await axios.post("localhost:4000/users/register", {
        firstName,
        lastName,
        email,
        password,
        avatarUrl,
        favorites,
      });
      if (data.success) {
        setNotification("User account successfully created!");
      }  
      console.log(data);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div className="notthere"></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="user_icon" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="email_icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="password_icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {action === "Sign Up" ? (
          <div className="notthere"></div>
        ) : (
          <div className="forgot-password">
            Lost Password? <span>Click Here</span>
          </div>
        )}

        <div className="submit-container">
          <button
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Sign Up");
              submitRegisterHandler()
            }}
          >
            Sign Up
          </button>
          <button
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Login");
            }}
          >
            Login
          </button>
        </div>
      </div>
      {notification && <Notification message={notification} />}
    </div>
  );
};

export default Login;
