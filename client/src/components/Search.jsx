/** @format */

import React from "react";

const Search = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
      {/* LEFT HAND */}
      <div className="border-b-2 md:border-r-2 md:min-h-screen md:border-b- p-3">
        <form className="flex flex-col gap-4">
          {/* TEXT SEARECH */}
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Terms:{" "}
            </label>
            <input
              type="text"
              name="searchTerms"
              id="searchTerms"
              placeholder="Search..."
              className="p-2 rounded-lg focus:outline-none border w-full"
            />
          </div>
          {/* TYPE FILTERS */}
          <div className="flex gap-2">
            <label className="whitespace-nowrap font-semibold">Type: </label>
            <div className="flex gap-1">
              <input type="checkbox" id="all" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="sale" />
              <span>Sale</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          {/* AMENITIES FILTERS */}

          <div className="flex gap-2">
            <label className="whitespace-nowrap font-semibold">
              Amenities:{" "}
            </label>
            <div className="flex gap-1">
              <input type="checkbox" id="parking" />
              <span>Parking</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="furnished" />
              <span>Furnished</span>
            </div>
          </div>
          {/* SORT OPTIONS */}
          <div>
            <label className="whitespace-nowrap font-semibold">Sort: </label>
            <select id="sort_order" className="p-2 rounded-lg">
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-600">
            Search
          </button>
        </form>
      </div>
      {/* RIGHT HAND */}
      <div className="p-3 ">
        <h2 className="text-2xl font-bold p-2 border-b-2">Listing Results: </h2>
      </div>
    </div>
  );
};

export default Search;
