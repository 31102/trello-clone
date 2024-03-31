import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import signUpImg1 from "../images/istockphoto-1774697861-2048x2048.jpg";
import signUpImg2 from "../images/istockphoto-628418488-2048x2048.jpg";
import {
  faGoogle,
  faMicrosoft,
  faApple,
  faSlack,
  faTrello,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Sign-up successful!", response.data);
      localStorage.setItem('userId', response.data.id);
      navigate("/");
    } catch (error: any) {
      toast.error("Incorrect email or password");
      console.error("Network Error:", error.response.data);
    }
  };

  return (
    <>
    <ToastContainer hideProgressBar={true} autoClose={3000} />
      <div className=" bg-white w-full h-screen relative overflow-hidden flex justify-center items-center mt-[10px]">
        <div className="fixed bottom-[-300px] left-0  ">
          <img className="w-[400px] h-[700px]" src={signUpImg2} alt="" />
        </div>
        <div className=" bg-slate-200 w-[430px] rounded-lg p-[40px] shadow-xl flex flex-col items-center">
          <div className="flex text-3xl mb-9">
            <FontAwesomeIcon
              className="w-10 h-10 text-blue-700"
              icon={faTrello}
            />
            <h1 className=" font-bold ml-2 underline">Trello</h1>
          </div>
          <p className="font-bold">Log in to Continue</p>
          <form onSubmit={loginHandler} action="" className="mt-4 w-full">
            <input
              value={email}
              onChange={(e): any => {
                return setEmail(e.target.value);
              }}
              className='w-full mb-3 h-10 p-3 outline-none  rounded "mt-1 block px-3 py-2 bg-white border border-slate-300 text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700
    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
    invalid:border-red-500 invalid:text-red-600
    focus:invalid:border-red-500 focus:invalid:ring-red-500'
              placeholder="Enter your email"
              type="email"
            />
            <input
              value={password}
              onChange={(e): any => {
                return setPassword(e.target.value);
              }}
              className='w-full mb-3 h-10 p-3 outline-none  rounded "mt-1 block px-3 py-2 bg-white border border-slate-300 text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700
    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
    invalid:border-red-500 invalid:text-red-600
    focus:invalid:border-red-500 focus:invalid:ring-red-500'
              placeholder="Enter your password"
              type="password"
            />

            <button className="bg-blue-600 p-2 my-4 w-full text-white rounded font-bold">
              Continue
            </button>
          </form>
          <p className="text-xs">OR</p>
          <div className="w-full text-center p-[10px] mt-3 shadow-xl font-bold flex bg-white rounded-md">
            <span className="ml-2 w-8 h-8 text-blue-700">
              <FontAwesomeIcon icon={faGoogle} />
            </span>
            <h4 className="ml-8 align-text-bottom">Continue with Google</h4>
          </div>
          <div className="w-full text-center p-[10px] mt-3 shadow-xl font-bold flex bg-white rounded-md">
            <span className="ml-2 w-8 h-8 text-blue-700">
              <FontAwesomeIcon icon={faMicrosoft} />
            </span>
            <h4 className="ml-8 align-text-bottom">Continue with Microsoft</h4>
          </div>
          <div className="w-full text-center p-[10px] mt-3 shadow-xl font-bold flex bg-white rounded-md">
            <span className="ml-2 w-8 h-8 text-blue-700">
              <FontAwesomeIcon icon={faApple} />
            </span>
            <h4 className="ml-8 align-text-bottom">Continue with Apple</h4>
          </div>
          <div className="w-full text-center p-[10px] mt-3 shadow-xl font-bold flex bg-white rounded-md">
            <span className="ml-2 w-8 h-8 text-blue-700">
              <FontAwesomeIcon icon={faSlack} />
            </span>
            <h4 className="ml-8 align-text-bottom">Continue with Slack</h4>
          </div>
          <p className="mt-4 ">
            Can't Login ?{" "}
            <Link className="text-blue-600 underline" to="/signUp">
              Create an acount
            </Link>
          </p>
        </div>
        <div className="fixed right-0 bottom-[-300px] ">
          <img className="w-[500px] h-[800px]" src={signUpImg1} alt="" />
        </div>
      </div>
    </>
  );
};

export default login;
