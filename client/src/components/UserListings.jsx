/** @format */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserListings = () => {
  //*********HOOKS*********/
  const [ListingError, setListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  //*********HOOKS*********/

  //*********functions*********/

  const handleShowListings = async () => {
    try
    {
      setLoading(true);
      setListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false)
      {
        setListingError(true);
        return;
      }
      setUserListings(data);
      setLoading(false);
    } catch (error)
    {
      setListingError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleShowListings();
  }, []);

  const handleListingDelete = async (listingId) => {
    try
    {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false)
      {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing.id !== listingId)
      );
    } catch (error)
    {
      console.log(error);
    }
  };

  //*********functions*********/

  return (
    <div className="">
      {userListings && userListings[0] ? (
        userListings.map((listing) => (
          <div
            key={listing._id}
            className=" border gap-2 border-gray-300 flex items-center justify-around p-2 mt-4 rounded-lg"
          >
            <img
              src={listing.imageUrls[0]}
              alt="my image"
              className="w-12 h-12 object-cover"
            />
            <div className="truncate">
              <Link
                to={`/listing/${listing._id}`}
                className="font-bold text-sm  hover:underline "
              >
                {listing.name}
              </Link>
            </div>
            <div className="flex items-center flex-col gap-2 justify-center">
              <button
                onClick={() => {
                  handleListingDelete(listing._id);
                }}
                className="p-1 bg-gray-400 rounded-lg  hover:bg-red-700 "
              >
                <span className="text-white">Delete</span>

              </button>
              <Link to={`/update-listing/${listing._id}`}>
                <button className="p-1 bg-gray-400 rounded-lg  hover:bg-green-700 ">
                  <span className="text-white">Edit</span>
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : loading ? (
        <p className="mt-8">...loading</p>
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
