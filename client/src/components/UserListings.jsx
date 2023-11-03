/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiDeleteBack2Fill, RiEditBoxFill } from "react-icons/ri";
const UserListings = () => {
  //*********HOOKS*********/
  const [ListingError, setListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  //*********HOOKS*********/

  //*********functions*********/

  const handleShowListings = async () => {
    try {
      setListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setListingError(true);
    }
  };
  useEffect(() => {
    handleShowListings();
  }, [handleShowListings]);

  //*********functions*********/

  return (
    <div className="">
      {userListings && userListings[0] ? (
        userListings.map((listing) => (
          <div
            key={listing._id}
            className=" border border-gray-300 flex items-center justify-around p-2 mt-4 rounded-lg"
          >
            <img
              src={listing.imageUrls[0]}
              alt="my image"
              className="w-12 h-12 object-cover"
            />
            <div>
              <Link
                to={`/listing/${listing._id}`}
                className="font-bold text-sm truncate hover:underline"
              >
                {listing.name}
              </Link>
            </div>
            <div className="flex items-center flex-col gap-2 justify-center">
              <button>
                <RiDeleteBack2Fill className="w-5 h-5 text-gray-400 hover:text-red-700" />
              </button>
              <button>
                <RiEditBoxFill className="w-5 h-5 text-gray-400 hover:text-green-700" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h3 className="my-8">There is no Listings here yet !</h3>
          <Link
            to={"/create-listing"}
            className="bg-green-700 text-white text-center  p-3 rounded-lg uppercase hover:bg-green-600"
          >
            create ?
          </Link>
        </div>
      )}
      {ListingError && <p>Error just happend ty again later !</p>}
    </div>
  );
};

export default UserListings;
