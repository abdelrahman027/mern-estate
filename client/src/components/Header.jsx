/** @format */

import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [toggleDrop, setToggleDrop] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const toggleDropHandler = () => {
    setToggleDrop(!toggleDrop);
  };
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* logo */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Pro</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        {/* search */}
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <AiOutlineSearch className="text-slate-600" />
        </form>
        {/* list */}
        <ul className="md:flex gap-4 hidden">
          <Link to="/">
            <li className="text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline cursor-pointer">
              ِAbout
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="avatar"
                className="w-8 h-8 object-cover rounded-full"
              />
            ) : (
              <li className="text-slate-700 hover:underline cursor-pointer">
                Sign in
              </li>
            )}
          </Link>
        </ul>
        {/* DropDown */}
        <div className="relative md:hidden inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={toggleDropHandler}
            >
              Menu
              <RxHamburgerMenu />
            </button>
          </div>

          <div
            className={`${
              toggleDrop ? "block" : "hidden"
            } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            tabIndex="-1"
            onMouseLeave={() => setToggleDrop(false)}
          >
            <ul className="py-1" role="none">
              <Link to="/">
                <li
                  href="#"
                  className="text-slate-700 block px-4 py-2 text-sm hover:underline cursor-pointer"
                  tabIndex="-1"
                >
                  Home
                </li>
              </Link>
              <Link to="/about">
                <li
                  href="#"
                  className="text-slate-700 block px-4 py-2 text-sm hover:underline cursor-pointer"
                  tabIndex="-1"
                >
                  About
                </li>
              </Link>
              <Link to="/profile">
                {currentUser ? (
                  <li className="flex items-center font-semibold hover:bg-slate-100 p-1 justify-center gap-2">
                    Profile
                    <img
                      src={currentUser.avatar}
                      alt="avatar"
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  </li>
                ) : (
                  <li className="text-slate-700 block px-4 py-2 text-sm hover:underline cursor-pointer">
                    Sign in
                  </li>
                )}
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
