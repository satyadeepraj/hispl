import React from "react";

import { Blogdetail } from "./Blogdetail";
import Header from "@/app/components/Header";
import SideBar from "@/app/components/SideBar";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <div>
      <div className=" min-h-screen w-full">
        <Header />
        <ToastContainer />
        <div className="flex  flex-col sm:flex-row   max-w-full min-h-screen">
          <div className="w-[25%] mobile:hidden">
            <SideBar />
          </div>

          <div className=""></div>
          <Blogdetail />
        </div>
      </div>
    </div>
  );
};

export default page;
