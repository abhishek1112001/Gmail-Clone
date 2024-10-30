import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/appSlice";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.success(err.response.data.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-3 bg-white p-4 w-[20%]"
        >
          <h1 className="font-bold text-2xl uppercase my-2">Login</h1>

          <input
            type="email"
            placeholder="Email"
            className=" border border-gray-400 rounded-md px-2 py-2"
            value={input.email}
            name="email"
            onChange={changeHandler}
          />

          <input
            type="password"
            placeholder="Password"
            className=" border border-gray-400 rounded-md px-2 py-2"
            value={input.password}
            name="password"
            onChange={changeHandler}
          />

          <button
            type="submit"
            className="bg-gray-800 p-2 text-white my-2 rounded-md"
          >
            Login
          </button>
          <p>
            Dont have an account ?{" "}
            <Link to={"/signup"} className="text-blue-600">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login; //18:35
