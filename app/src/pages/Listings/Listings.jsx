import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

const Listings = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(listing);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`/api/listings/getListing/${id}`);
        setListing(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!listing) {
    return <div>No listing found</div>;
  }

  return (
    <div>
      <div className="relative">
        <img
          src={listing?.imageUrls[0]}
          alt="listing_image"
          className="w-full h-full "
        />

        <Link
          to="/"
          className="absolute top-32  right-20 w-10 h-10 flex justify-center items-center text-2xl rounded-full bg-white">
          <FaShare />
        </Link>

        <div className="absolute bottom-52 text-white">
          <div className="container mx-10 my-10 flex flex-col gap-4 ">
            <h1 className="text-6xl font-bold">{listing.name}</h1>
            <div className="flex gap-2 items-center">
              <FaLocationDot className="text-green-600" />
              <h1 className="capitalize">{listing.address}</h1>
            </div>
            <div>
              {listing.type === "rent" ? (
                <button className="bg-red-700 w-[20%] text-white rounded-lg py-1">
                  Rent
                </button>
              ) : (
                <button>Sell</button>
              )}
            </div>
            <div>
              <h1>
                <b>Description : </b>
                {listing.description}
              </h1>
            </div>
            <div>
              <ul className="flex gap-4 items-center">
                <li className="flex gap-2 items-center">
                  <FaBed className="text-green-700" />
                  <span>{listing.bedRooms}</span>
                  <span>{listing.bedRooms > 1 ? "Beds" : "Bed"}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <FaBath className="text-green-700" />
                  <span>{listing.bathRooms}</span>
                  <span>{listing.bathRooms > 1 ? "Baths" : "Bath"}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <FaParking className="text-green-700" />
                  <span>Parking Sopt</span>
                </li>
                <li className="flex gap-2 items-center">
                  <FaChair className="text-green-700" />
                  <span>Furnitured</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
