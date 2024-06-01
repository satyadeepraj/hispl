"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [blogData, setBlogData] = useState();

  // Fetch both sets of data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get("/api/blogs");

        const blogProducts = blogResponse.data.data;

        setBlogData(blogProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const contextValue = { blogData };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
