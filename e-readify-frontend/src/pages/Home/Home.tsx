import React, { useState, useEffect } from "react";
import "./Home.css";
import NavBar from "@/components/NavBar/NavBar";
import HeroTxt from "@/components/HeroTxt/HeroTxt";

function Home() {
  const images = ['assets/hero-img.jpg', 'assets/hero-img-1.jpg'];
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  }, []);

  return (
    <div className="home" style={{ backgroundImage: `url(${selectedImage})` }}>
      <div className="nav">
        <NavBar />
      </div>
      <div className="hero-txt">
        <HeroTxt />
      </div>
    </div>
  );
}

export default Home;
