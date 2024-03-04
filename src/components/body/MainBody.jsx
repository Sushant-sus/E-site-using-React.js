import React, { useState, useEffect } from "react";
import "./MainBody.css";
import advertisement from "../../image/Header_-Food-ads.webp";
import ad1 from "../../image/istockphoto-1457979959-170667a.webp";
import ad2 from "../../image/Screenshot 2024-02-28 174131.png";
import img1 from "../../image/img1.png";
import img2 from "../../image/img2.png";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { layoutlist } from "../Api";
import { useNavigate } from "react-router-dom";

const images = [advertisement, ad1, ad2, img1, img2];

const MainBody = () => {
  const [layoutData, setLayoutData] = useState([]);
  const navigate = useNavigate();

  const navigateToLayoutItemList = (layoutId) => {
    navigate(`/layout/item/list/${layoutId}`);
  };

  //for random image generate
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  useEffect(() => {
    fetchLayoutData();
  }, []);

  const fetchLayoutData = async () => {
    try {
      const data = await layoutlist();
      setLayoutData(data);
    } catch (error) {
      console.error("Error fetching layout data:", error);
    }
  };

  const handleEvent = (layoutId) => {
    console.log("clicked:", layoutId);
    navigateToLayoutItemList(layoutId);
    navigate(`/layout/item/${layoutId}`);
  };

  const handleSeeMore = () => {
    navigate("/layout");
  };

  return (
    <>
      <Header />
      <div className="main">
        <div
          className="main1 flex justify-center items-center"
          style={{ backgroundImage: `url(${advertisement})` }}
        >
          <div className="grid grid-cols-8 w-[50%] h-10">
            <input
              className="col-span-6 px-4"
              type="text"
              placeholder="Search items"
            />
            <button className="col-span-2 bg-yellow-300">Search</button>
          </div>
        </div>
        <div className="main2">
          <div className="main3">
            <div className="main4 text-sm font-semibold font-sans">
              FOODSTALL
            </div>
            <div className="main5">
              <img src={ad2} alt="" />
            </div>
          </div>
        </div>
        <div className="services">
          <div className="flex w-full h-full justify-center items-center">
            <div className="grid-container">
              {layoutData.map((item, index) => (
                <div
                  key={index}
                  className={`item${
                    index + 2
                  } flex justify-center items-center text-4xl text-black-600 font-semibold font-serif cursor-pointer`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url(${getRandomImage()})`,
                  }}
                  onClick={() => handleEvent(item.layoutId)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-[280px] mr-4 w-fit">
            <button
              className="absolute bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={handleSeeMore}
            >
              See More
            </button>
          </div>{" "}
        </div>
        {/* about us */}
        <div className="about">
          <div className="about-container">
            <div></div>
            <div className="about-body">
              <div className="flex justify-center items-center text-2xl">
                About Us
              </div>
              <div className="flex justify-center items-center">
                Foodsala is the fastest, easiest and most convenient way to
                enjoy the best food of your favourite restaurants at home, at
                the office or wherever you want to.
              </div>
              <div className="flex justify-center items-center">
                We know that your time is valuable and sometimes every minute in
                the day counts. That’s why we deliver! So you can spend more
                time doing the things you love.
              </div>
              <button>Learn More</button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainBody;
