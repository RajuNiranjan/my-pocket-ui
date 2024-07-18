import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

const Listings = () => {
  const { id } = useParams();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/api/listings/getListing/${id}`);
      const data = res.data;
      setListings(data);
    };
    fetch();
  }, [id]);

  return (
    <div>
      <div>
        <img
          src={listings.imageUrls[0]}
          alt="listing_image"
          className="w-full h-full"
        />
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">{listings.name}</h1>
          <div>
            {/* <LocationOnIcon /> */}
            {/* <h1>{listings.address}</h1> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
