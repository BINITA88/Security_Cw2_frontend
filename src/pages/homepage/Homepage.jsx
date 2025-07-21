import React, { useRef, useState, useEffect } from "react";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import banner3 from "../../assets/images/banner3.png";
import banner4 from "../../assets/images/banner4.png";
import banner5 from "../../assets/images/banner5.png";
import Carousel from "../../components/Carousel";
import Footer from "../../components/Footer";

const Counter = ({ className, start, end, delay }) => {
  const [count, setCount] = useState(start);
  const [isEnd, setIsEnd] = useState(false);
  const ref = useRef(null);

  const startCounter = () => {
    let current = start;
    const timer = setInterval(() => {
      if (current < end) {
        current++;
        setCount(current);
      } else {
        clearInterval(timer);
      }
    }, delay);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isEnd) {
          setIsEnd(true);
          startCounter();
        }
      },
      { rootMargin: "0px 0px -100px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setCount(start);
    setIsEnd(false);
  }, [start]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
};

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

  const data = [
    {
      icon: "asset/images/counter/home3/1.png",
      value: 5,
      label: " Readers ",
      delay: 100,
    },
    {
      icon: "asset/images/counter/home3/2.png",
      value: 3,
      label: " Writers",
      delay: 100,
    },
    {
      icon: "asset/images/counter/home3/3.png",
      value: 5,
      label: " Articles",
      delay: 100,
    },
    {
      icon: "asset/images/counter/home3/4.png",
      value: 25,
      label: " Total Reads ",
      delay: 100,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f4f0]  text-[#5a3210]">
      <Carousel />
<div className="flex flex-col items-center mt-10">
  </div>
      <div className="min-h-auto mt-9 bg-[#ffffff]">
        <section id="why-us" className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#4a1f0d] mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-[#7d5632] max-w-3xl mx-auto">
                Designed with you in mind, our platform prioritizes ease of use, transparency,
                and meaningful engagement to elevate your reading and writing experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center">
                <svg className="w-12 h-12 text-[#a75c1d] mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a3 3 0 00-.879-2.121M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2a3 3 0 01.879-2.121m0 0A5.002 5.002 0 0112 13a5.002 5.002 0 014.121 2.879M7.879 15.879L7.9 15.9"></path></svg>
                <h3 className="text-xl font-semibold text-[#4a1f0d] mb-2">Intuitive Navigation</h3>
                <p className="text-[#7d5632] max-w-sm">
                  Easily find what you need with clear menus, consistent layouts, and responsive design that adapts to your device.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <svg className="w-12 h-12 text-[#a75c1d] mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405M15 17l-2-2m2 2l2-2M9 17H4l1.405-1.405M9 17l2-2m-2 2l-2-2M12 3v4m0 0l1.5 1.5m-1.5-1.5L10.5 8.5"></path></svg>
                <h3 className="text-xl font-semibold text-[#4a1f0d] mb-2">Instant Feedback</h3>
                <p className="text-[#7d5632] max-w-sm">
                  Receive real-time notifications and confirmations so you’re always aware of your interactions and updates.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <svg className="w-12 h-12 text-[#a75c1d] mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3h4.5c.966 0 1.75.784 1.75 1.75v.5c0 .966-.784 1.75-1.75 1.75h-4.5C8.784 7 8 6.216 8 5.25v-.5C8 3.784 8.784 3 9.75 3zM4.25 11.25A2.25 2.25 0 016.5 9h11a2.25 2.25 0 012.25 2.25v8.5A2.25 2.25 0 0117.5 22h-11a2.25 2.25 0 01-2.25-2.25v-8.5z"></path></svg>
                <h3 className="text-xl font-semibold text-[#4a1f0d] mb-2">Full Control</h3>
                <p className="text-[#7d5632] max-w-sm">
                  Customize your experience with personal settings and privacy controls that put you in charge.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

   

      <Footer />
    </div>
  );
};

export default HomePage;
