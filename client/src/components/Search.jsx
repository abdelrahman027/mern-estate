/** @format */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchFilterData, setSearchFilterData] = useState({
    searchTerms: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    )
    {
      setSearchFilterData({
        searchTerms: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }
    const fetchListing = async () => {
      try
      {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setLoading(false)
        setListings(data)
      } catch (error)
      {
        setLoading(false)
        console.log(error);
      }
    }
    fetchListing()

  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    )
    {
      setSearchFilterData({ ...searchFilterData, type: e.target.id });
    }

    if (e.target.id === "searchTerms")
    {
      setSearchFilterData({ ...searchFilterData, searchTerms: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    )
    {
      setSearchFilterData({
        ...searchFilterData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order")
    {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchFilterData({ ...searchFilterData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerms", searchFilterData.searchTerms);
    urlParams.set("type", searchFilterData.type);
    urlParams.set("parking", searchFilterData.parking);
    urlParams.set("furnished", searchFilterData.furnished);
    urlParams.set("offer", searchFilterData.offer);
    urlParams.set("sort", searchFilterData.sort);
    urlParams.set("order", searchFilterData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  console.log(listings)
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
      {/* LEFT HAND */}
      <div className="border-b-2 md:border-r-2 md:min-h-screen md:border-b- p-3">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              value={searchFilterData.searchTerms}
              onChange={handleChange}
            />
          </div>
          {/* TYPE FILTERS */}
          <div className="flex gap-2 flex-wrap">
            <label className="whitespace-nowrap font-semibold">Type: </label>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="all"
                onChange={handleChange}
                checked={searchFilterData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="rent"
                onChange={handleChange}
                checked={searchFilterData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="sale"
                onChange={handleChange}
                checked={searchFilterData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="offer"
                onChange={handleChange}
                checked={searchFilterData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          {/* AMENITIES FILTERS */}

          <div className="flex gap-2">
            <label className="whitespace-nowrap font-semibold">
              Amenities:{" "}
            </label>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="parking"
                onChange={handleChange}
                checked={searchFilterData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                checked={searchFilterData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          {/* SORT OPTIONS */}
          <div>
            <label className="whitespace-nowrap font-semibold">Sort: </label>
            <select
              id="sort_order"
              className="p-2 rounded-lg"
              // value={searchFilterData.sort}
              defaultValue={'created_at_desc'}
              onChange={handleChange}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
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
