/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { BiShow, BiHide } from "react-icons/bi";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [signinData, setSigninData] = useState({});
  const [showPasword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword(!showPasword);
  };
  const handleChange = (e) => {
    setSigninData({
      ...signinData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="p-3 border rounded-lg"
          onChange={handleChange}
        />
        <div className="relative">
          <input
            type={showPasword ? "text" : "password"}
            id="password"
            placeholder="Password"
            className="p-3 border rounded-lg w-full"
            onChange={handleChange}
          />
          <div
            className="absolute top-3 text-slate-200 cursor-pointer hover:text-slate-300 right-2"
            onClick={handleShowPassword}
          >
            {showPasword ? (
              <BiShow className="h-7 w-7" />
            ) : (
              <BiHide className="h-7 w-7" />
            )}
          </div>
        </div>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded lg hover:bg-slate-600 uppercase disabled:opacity-80"
        >
          {loading ? "loading" : "Sign in"}
        </button>
        <OAuth />
        {error && (
          <p className="text-red-500 border bg-white text-sm p-1 rounded-lg text-center">
            {error}
          </p>
        )}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an acount?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700 hover:underline">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
