import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

function Body() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.app);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Body;
