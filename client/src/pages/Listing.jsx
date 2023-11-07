/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import { BiShare } from 'react-icons/bi';
import { FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from "../components/Contact";


const Listing = () => {
  SwiperCore.use([Navigation, EffectFade, Autoplay]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
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
      {loading && <p className="text-center my-8 text-2xl">..Loading</p>}
      {error && (
        <p className="text-center my-8 text-2xl">Something went wrong !</p>
      )}
      {listing && !error && !loading && (
        <div>
          {/* SLIDING IMAGE */}
          <Swiper
            navigation
            effect="fade"
            loop
            speed={1500}
            autoplay={{ delay: 3000 }}
          >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[350px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
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
      )}
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
    </main>
  );
};

export default Listing;
