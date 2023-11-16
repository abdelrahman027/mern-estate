/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiShare } from 'react-icons/bi';
import { FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from "../components/Contact";
import ImageSlider from "../components/ImageSlider";


const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [showFullImg, setShowFullImg] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const params = useParams();
  const ListingId = params.id;

  const fetchListing = async () => {
    try
    {
      setLoading(true);
      const res = await fetch(`/api/listing/get/${ListingId}`);
      const data = await res.json();
      if (data.success === false)
      {
        setError(true);
        setLoading(false);
        return;
      }
      setListing(data);
      setLoading(false);
      setError(false);
    } catch (error)
    {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  console.log(listing?.regularPrice)
  console.log(listing?.discountPrice)

  return (
    <main>

      {showFullImg ? <div className="fixed overflow-auto top-0 left-0
     p-12 w-full h-full z-40 bg-black/60">
        <button className="fixed top-8 right-16 bg-red-700 text-white p-2 rounded-lg" onClick={() => setShowFullImg(false)}>Close</button>
        <div className="flex flex-col gap-6">
          {listing?.imageUrls.map((url) => (
            <div key={`${listing._id}/img`} className="flex items-center justify-center">
              <img src={url} alt="pic" className="rounded-lg w-[800px]" />
            </div>
          ))}
        </div>
      </div> : ''}

      {loading && <p className="text-center my-8 text-2xl">..Loading</p>}
      {
        error && (
          <p className="text-center my-8 text-2xl">Something went wrong !</p>
        )
      }
      {
        listing && !error && !loading && (
          <div className="cursor-zoom-in" onClick={() => { setShowFullImg(true) }} >
            {/* SLIDING IMAGE */}
            <ImageSlider listing={listing} />
            {/* COPY BUTTON */}
            <div className="fixed top-32 right-10 z-10 w-10 h-10 border rounded-full flex items-center justify-center bg-slate-100 cursor-pointer">
              <BiShare className="text-slate-500 text-xl"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false)
                  }, 2000);

                }}
              />
            </div>
            {copied && (<p className="fixed top-48 right-10 z-10 rounded-md bg-slate-100 p-2">Link copied! </p>)}
          </div>
        )
      }
      {/* LISTING TITLE */}
      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
        <p className='text-2xl font-semibold'>
          {listing?.name} - ${' '}
          {listing?.offer
            ? listing?.discountPrice.toLocaleString('en-US')
            : listing?.regularPrice.toLocaleString('en-US')}
          {listing?.type === 'rent' && ' / month'}
        </p>
        <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
          <FaMapMarkerAlt className='text-green-700' />
          {listing?.address}
        </p>
        <div className='flex gap-4'>
          <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
            {listing?.type === 'rent' ? 'For Rent' : 'For Sale'}
          </p>
          {listing?.offer && (
            <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
              ${(+listing?.regularPrice) - (+listing?.discountPrice)} OFF
            </p>
          )}
        </div>
        <p className='text-slate-800'>
          <span className='font-semibold text-black'>Description - </span>
          {listing?.description}
        </p>
        <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <FaBed className='text-lg' />
            {listing?.bedrooms > 1
              ? `${listing?.bedrooms} beds `
              : `${listing?.bedrooms} bed `}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <FaBath className='text-lg' />
            {listing?.bathrooms > 1
              ? `${listing?.bathrooms} baths `
              : `${listing?.bathrooms} bath `}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <FaParking className='text-lg' />
            {listing?.parking ? 'Parking spot' : 'No Parking'}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <FaChair className='text-lg' />
            {listing?.furnished ? 'Furnished' : 'Unfurnished'}
          </li>
        </ul>
        {currentUser && listing?.userRef !== currentUser._id && !contact && (
          <button
            onClick={() => { setContact(true) }}
            className="uppercase bg-slate-700 text-white rounded-lg hover:opacity-95 p-3">
            Contact landlord
          </button>
        )}
        {contact && <Contact listing={listing} />}
      </div>

      {/* IMAGE MODAL */}


    </main >
  );
};

export default Listing;
