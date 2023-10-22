/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { BiHide, BiShow } from "react-icons/bi";

const SignUp = () => {
  const [showPasword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPasword);
  };

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setFetchError(data.message);
        return;
      }
      setLoading(false);
      setFetchError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setFetchError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="p-3 border rounded-lg"
          onChange={handleChange}
        />
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
          {loading ? "loading" : "Sign up"}
        </button>
        <OAuth />
        {fetchError && <p className="text-red-500">{fetchError}</p>}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an acount?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
