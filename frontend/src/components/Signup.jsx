import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-3 bg-white p-4 w-[20%]"
        >
          <h1 className="font-bold text-2xl uppercase my-2">SignUp</h1>
          <input
            type="text"
            placeholder="Name"
            className=" border border-gray-400 rounded-md px-2 py-2"
            onChange={changeHandler}
            value={input.fullname}
            name="fullname"
          />
          <input
            type="email"
            placeholder="Email"
            className=" border border-gray-400 rounded-md px-2 py-2"
            onChange={changeHandler}
            value={input.email}
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            className=" border border-gray-400 rounded-md px-2 py-2"
            onChange={changeHandler}
            value={input.password}
            name="password"
          />
          <button
            type="submit"
            className="bg-gray-800 p-2 text-white my-2 rounded-md"
          >
            SignUp
          </button>
          <p>
            Already have an account ?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
