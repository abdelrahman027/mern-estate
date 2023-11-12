/* eslint-disable react/prop-types */
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
    return (
        <Link to={`/listing/${listing._id}`} className='rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <img src={listing.imageUrls[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={`listingImg/${listing.imageUrls[0]}`} className='h-[220px] w-full hover:scale-105 transition-all duration-300 object-cover' />
            <div className='p-3'>
                <h2 className='font-bold my-4 line-clamp-1'>{listing.name}</h2>
                <div className='flex gap-2'>
                    <FaMapMarkerAlt className='text-green-700' />
                    <address className="text-xs truncate ">{listing.address}</address>
                </div>
                <p className='line-clamp-2 text-xs my-2 text-gray-600'>{listing.description}</p>
                <p className='text-slate-500 mt-2 font-semibold '>
                    $
                    {listing.offer
                        ? listing.discountPrice.toLocaleString('en-US')
                        : listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && ' / month'}
                </p>
                <div className='text-slate-700 mt-2 flex gap-4'>
                    <div className='font-bold text-xs'>
                        {listing.bedrooms > 1
                            ? `${listing.bedrooms} beds `
                            : `${listing.bedrooms} bed `}
                    </div>
                    <div className='font-bold text-xs'>
                        {listing.bathrooms > 1
                            ? `${listing.bathrooms} baths `
                            : `${listing.bathrooms} bath `}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ListingCard