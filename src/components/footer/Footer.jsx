import React from "react";
import app1 from "../../image/Screenshot_1.png";
import app2 from "../../image/Screenshot_2.png";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="grid justify-center h-80 w-full p-7">
      <div className="grid grid-rows-4">
        <div className="grid grid-cols-12 row-span-3">
          <div className=" w-full px-4 col-span-3">
            <div className="font-semibold">WE'RE FOODSALA</div>
            <div>About Us</div>
            <div>Available Areas</div>
            <div>Delivery Charges</div>
          </div>
          <div className=" w-full px-4 col-span-2">
            <div className="font-semibold">CONTACT US</div>
            <div>Kathmandu: 5511332</div>
            <div>Pokhara: 5588774</div>
            <div>Butwal: 552241</div>
          </div>
          <div className=" w-full px-4 col-span-3">
            <div className="font-semibold">HELP</div>
            <div>HOW TO ORDER</div>
            <div>FAQs</div>
            <div>CONTACT US</div>
          </div>
          <div className=" w-full px-4 col-span-4">
            <div className="text-sm h-4 font-semibold">DOWNLOAD APP</div>
            <div className="flex gap-4 my-2">
              <div className="h-9 w-[100px]">
                <img className="h-full" src={app1} alt="appstore" />
              </div>
              <div className="h-9 w-[120px]">
                <img className="h-full" src={app2} alt="appstore" />
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">CONNECT WITH US</div>
              <div className="flex gap-2 items-center p-2">
                <div className="h-8 w-8">
                  <FaSquareFacebook className="h-full w-full" />
                </div>
                <div className="h-8 w-8">
                  <IoLogoYoutube className="h-full w-full" />
                </div>
                <div className="h-8 w-8">
                  <FaInstagram className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center p-4  row-span-1">
          <div className="flex justify-between w-[100%]">
            <div className="flex gap-4">
              <div className="text-sm">Terms of Usage</div>
              <div className="text-sm">Privacy Policy</div>
            </div>
            <div className="text-sm">
              © 2024 Foodsala Pvt. Ltd. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
