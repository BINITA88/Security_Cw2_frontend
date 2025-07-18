import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import carRaceVideo from "../../assets/mp4/car_race.mp4";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import banner3 from "../../assets/images/banner3.png";
import banner4 from "../../assets/images/banner4.png";
import banner5 from "../../assets/images/banner5.png";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import Whyus from "../../components/Whyus";
import CounterThree from "../../components/CounterThree";
import Footer from "../../components/Footer";

const HomePage = () => {
  const banners = [banner1, banner2, banner3, banner4, banner5];
  const bannerContainerRef = useRef(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    if (bannerContainerRef.current) {
      bannerContainerRef.current.scrollLeft =
        currentBannerIndex * bannerContainerRef.current.offsetWidth;
    }
  }, [currentBannerIndex]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-100"
    >
   <Carousel/>
   <Whyus/>
   <CounterThree/>
<div></div>
   <Footer/>
    </div>
  );
};

export default HomePage;
