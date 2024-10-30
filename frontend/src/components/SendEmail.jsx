import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setEmails, setOpen } from "../redux/appSlice";
import { toast } from "react-hot-toast";
import axios from "axios";

function SendEmail() {
  const { open, emails } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const changeHandller = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandller = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/email/create`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(setEmails([...emails, res.data]));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    dispatch(setOpen(false));
  };

  return (
    <>
      <div
        className={`${
          open ? "block" : "hidden"
        } bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}
      >
        <div className="flex items-center justify-between px-3 py-2 bg-[#F2F6FC]">
          <h1>New Message</h1>
          <div
            className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
            onClick={() => dispatch(setOpen(false))}
          >
            <RxCross2 size={"20px"} />
          </div>
        </div>
        <form onSubmit={submitHandller} className="flex flex-col p-3 gap-2">
          <input
            type="text"
            placeholder="To"
            className="outline-none py-1 border-b-2 border-[#ECEFF1]"
            name="to"
            value={formData.to}
            onChange={changeHandller}
          />
          <input
            type="text"
            placeholder="Subject"
            className="outline-none py-1 border-b-2 border-[#ECEFF1]"
            name="subject"
            value={formData.subject}
            onChange={changeHandller}
          />
          <textarea
            rows={"10"}
            cols={"30"}
            className="outline-none py-1"
            name="message"
            value={formData.message}
            onChange={changeHandller}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-700 rounded-full py-1 px-5 w-fit text-white"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default SendEmail;
