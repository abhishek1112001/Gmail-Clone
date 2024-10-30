import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEmails } from "../redux/appSlice";

const useGetAllEmails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/email/getallemails`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        //console.log(res.data.emails);
        dispatch(setEmails(res.data.emails));
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmails();
  }, []);
};
export default useGetAllEmails;
