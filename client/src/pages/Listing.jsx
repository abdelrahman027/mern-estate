/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation, EffectFade, Autoplay]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();
  const ListingId = params.id;

  const fetchListing = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/listing/get/${ListingId}`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(fasle);
        return;
      }
      setListing(data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  return (
    <main>
      {loading && <p className="text-center my-8 text-2xl">..Loading</p>}
      {error && (
        <p className="text-center my-8 text-2xl">Something went wrong !</p>
      )}
      {listing && !error && !loading && (
        <div>
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
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
};

export default Listing;
