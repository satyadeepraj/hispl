// Import necessary libraries and components
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";
import image from "../../public/loginpage/logo.png";
import HomeIcon from "../../public/sidebar/home.png";
import BoxIcon from "../../public/sidebar/box.png";
import ProductIcon from "../../public/sidebar/product.png";
import CustomerIcon from "../../public/sidebar/customer.png";
import SignOutAltIcon from "../../public/sidebar/logout.png";

// Sidebar component
const SideBar = () => {
  const router = useRouter();

  // Function to determine if a link is active
  const isLinkActive = (href) => {
    return router.pathname === href;
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Remove the cookie
    Cookies.remove("jwt");

    // Redirect to the login page
    router.push("/");
  };

  return (
    <div className="fixed h-screen w-64 mt-5 mobile:mt-0  bg-[#EBEBEB] shadow-xl mobile:shadow-none text-xs  font-bold flex flex-col items-center overflow-auto">
      {/* Sidebar Content */}

      <div className="w-full pt-6 mt-12 flex justify-left ml-16 mobile space-y-6 ">
       
          <Link
            href="/"
            className={`hover:bg-white hover:rounded p-2  ${
              isLinkActive("/admin") && "bg-white"
            }`}
          >
            <span className="flex space-x-2">
              <Image
                alt=""
                src={HomeIcon}
                width={20}
                height={20}
                className={`mr-2 `}
              ></Image>
              <p
                className={`hover:text-gray-700 ${
                  isLinkActive("/admin") && "text-gray-700"
                }`}
              >
                Admin Form
              </p>
            </span>
          </Link>
    
      </div>
     
     
      <div className="w-full flex justify-left ml-16">
        <Link
          href="/allBlogs"
          className={`hover:bg-white hover:rounded p-2 ${
            isLinkActive("/customers") && "bg-white"
          }`}
        >
          <span className="flex space-x-2">
            <Image
              src={CustomerIcon}
              width={20}
              height={20}
              className="mr-2"
            ></Image>
            <p
              className={`hover:text-gray-700 ${
                isLinkActive("/customers") && "text-gray-700"
              }`}
            >
              Blogs
            </p>
          </span>
        </Link>
      </div>
      <hr className="w-4/5 border-ts border-gray-400 my-3 font-extrabold" />
      {/* Logout Link */}
      <div className="w-full flex justify-left ml-16">
        <div
          className={`hover:bg-white hover:rounded p-2 cursor-pointer ${
            isLinkActive("/") && "bg-white"
          }`}
          onClick={handleLogout}
        >
          <span className="flex space-x-2">
            <Image
              src={SignOutAltIcon}
              width={20}
              height={20}
              className="mr-2"
            ></Image>
            <p
              className={`hover:text-gray-700 ${
                isLinkActive("/") && "text-gray-700"
              }`}
            >
              Logout
            </p>
          </span>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className=" ">
        <p className="text-base font-semibold text-center text-black">
          Powered By:
        </p>
        <Image
          width={100}
          height={100}
          src={image}
          alt="Powered by Your Company"
          className="w-50 h-42 "
        />
      </div>
    </div>
  );
};

export default SideBar;
