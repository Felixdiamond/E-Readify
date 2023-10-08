import React from "react";
import "./HeroTxt.css";

function HeroTxt() {
  return (
    <div className="heroTxt">
      <h1 className="bigtxt">Welcome to <span className="gradienTxt">E-Readify.</span></h1>
      <p className="smalltxt">
      Discover a world of books at your fingertips with E-Readify. Start your reading journey today!
      </p>
      <button className="animate-bounce">
        Get Started
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

      </button>
    </div>
  );
}

export default HeroTxt;
