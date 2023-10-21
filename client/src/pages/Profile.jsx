/** @format */

import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [showPasword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPasword);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1
        className="text-3xl font-semibold text-semibold
      text-center my-7"
      >
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover self-center mt-2"
        />
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="p-3 border rounded-lg"
          onChange={""}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="p-3 border rounded-lg"
          onChange={""}
        />
        <div className="relative">
          <input
            type={showPasword ? "text" : "password"}
            id="password"
            placeholder="Password"
            className="p-3 border rounded-lg w-full"
            onChange={""}
          />
          <div
            className="absolute top-3 text-slate-200 cursor-pointer hover:text-slate-300 right-2"
            onClick={handleShowPassword}
          >
            {showPasword ? (
              <BiHide className="h-7 w-7" />
            ) : (
              <BiShow className="h-7 w-7" />
            )}
          </div>
        </div>
        <button className="p-3 rounded-lg text-white bg-slate-700 hover:bg-slate-600">
          Update
        </button>
      </form>
      <div className="flex justify-between items-center mt-4">
        <span className="text-red-700 hover:underline cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 hover:underline cursor-pointer">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Profile;
