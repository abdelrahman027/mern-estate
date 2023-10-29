/** @format */

import React from "react";

const CreateListing = () => {
  return (
    <main className="p-4 max-w-2xl md:max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="text-center grid grid-cols-1 justify-center items-center md:grid-cols-2">
        <div>
          {/* TEXT INPUTS */}
          <div className="flex flex-col gap-2 w-3/4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="p-3 rounded-lg"
            />
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              className="p-3 rounded-lg"
            />
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              className="p-3 rounded-lg"
            />
          </div>
          {/* CHECK BOXES */}
          <div className="flex gap-6 itmes-center border-gray-300 border p-3 w-fit rounded-lg flex-wrap mt-4">
            <div className="flex gap-1">
              <input type="checkbox" name="sell" id="sell" />
              <span>Sell</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" name="rent" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" name="parking" id="parking" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" name="furnished" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" name="offer" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          {/* NUMBER INPUTS */}
          <div className="flex gap-4 flex-wrap  border-gray-300 border p-3 w-fit rounded-lg items-center  mt-4">
            <div className="gap-2 flex items-center" defaultValue={1}>
              <label htmlFor="beds">Beds:</label>
              <input
                type="number"
                name="bedroom"
                id="bedroom"
                className="rounded-lg p-2 w-12 border border-gray-300"
              />
            </div>
            <div className="gap-2 flex items-center" defaultValue={1}>
              <label htmlFor="bathroom">Baths:</label>
              <input
                type="number"
                name="bathroom"
                id="bathroom"
                className="rounded-lg p-2 w-12 border border-gray-300"
              />
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center border border-gray-300 w w-fit rounded-lg p-3 mt-4">
            <div className="text-center mt-4" defaultValue={1}>
              <label htmlFor="regularPrice">Regular Price: </label>
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                className="rounded-lg p-2 w-24 border border-gray-300"
              />
              <span className="text-xs opacity-50"> ($/month) </span>
            </div>
            <div className="text-center mt-4" defaultValue={1}>
              <label htmlFor="discountPrice">Discounted Price: </label>
              <input
                type="number"
                name="discountPrice"
                id="discountPrice"
                className="rounded-lg p-2 w-24 border border-gray-300"
              />
              <span className="text-xs opacity-50"> ($/month) </span>
            </div>
          </div>
        </div>
        {/* input file & upload */}
        <div className="my-8">
          <p className="mb-4">
            Images:{" "}
            <span className="text-xs opacity-50">
              The first image wikk be the cover (max6)
            </span>{" "}
          </p>
          <div className="flex items-center gap-4 justify-center">
            <input
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
              className="border border-gray-300 p-3 rounded-lg"
            />
            <button className="uppercaswe border hover:bg-gray-200 border-green-600 text-green-600 p-3 rounded-lg disabled:opacity-50 disabled:cursor-wait">
              Upload
            </button>
          </div>
          {/* submit button */}
          <button className="bg-slate-700 mx-auto mt-8 text-white uppercase rounded-lg hover:bg-slate-600 p-3  disabled:opacity-50 disabled:cursor-wait w-3/4">
            {" "}
            create listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
