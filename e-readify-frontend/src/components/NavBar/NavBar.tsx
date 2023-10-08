import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "./NavBar.css";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("/");

  const handleOnClick = (path: string): void => {
    setActiveLink(path);
  };

  return (
    <div className="navbar text-white">
      <div className="logo">
        <span className="text-white logo-text">
          <span className="funfont">E</span>-Readify
        </span>
      </div>
      <div className="nav-items">
        <NavLink
          to="/"
          end
          className={activeLink === "/" ? "font-bold" : ""}
          onClick={() => handleOnClick("/")}
        >
          Home
        </NavLink>
        <NavLink
          to="/discover"
          className={activeLink === "/discover" ? "font-bold" : ""}
          onClick={() => handleOnClick("/discover")}
        >
          Discover
        </NavLink>
        <NavLink
          to="/release"
          className={activeLink === "/release" ? "font-bold" : ""}
          onClick={() => handleOnClick("/release")}
        >
          Books Release
        </NavLink>
        <NavLink
          to="/forum"
          className={activeLink === "/forum" ? "font-bold" : ""}
          onClick={() => handleOnClick("/forum")}
        >
          Forum
        </NavLink>
        <NavLink
          to="/about"
          className={activeLink === "/about" ? "font-bold" : ""}
          onClick={() => handleOnClick("/about")}
        >
          About
        </NavLink>
      </div>
      <div className="search-signup-login">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 search-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <Button variant="outline" className="signup-btn">
          Sign up
        </Button>
        <Button className="login-btn"><NavLink
          to="/login"
          onClick={() => handleOnClick("/login")}
        >
          Login
        </NavLink></Button>
      </div>
    </div>
  );
};

export default NavBar;
