/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signinData, setSigninData] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSigninData({
      ...signinData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try
    {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      });

      const data = await res.json();
      if (data.success === false)
      {
        setLoading(false);
        setFetchError(data.message);
        return;
      }
      setLoading(false);
      setFetchError(null);
      navigate("/");
    } catch (error)
    {
      setLoading(false);
      setFetchError(error.message);
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
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="p-3 border rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded lg hover:bg-slate-600 uppercase disabled:opacity-80"
        >
          {loading ? "loading" : "Sign in"}
        </button>
        {fetchError && <p className="text-red-500">{fetchError}</p>}
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
