/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css/bundle";


const ImageSlider = ({ listing }) => {
    SwiperCore.use([Navigation, EffectFade, Autoplay]);
    return (
        <div>
            <Swiper
                navigation
                effect="fade"
                loop
                speed={1500}
                autoplay={{ delay: 3000 }}
            >
                {listing?.imageUrls?.map((url) => (
                    <SwiperSlide key={url}>
                        <div
                            className="h-[350px] transition-all duration-300"
                            style={{
                                background: `url(${url}) center no-repeat`,
                                backgroundSize: "cover",
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ImageSlider