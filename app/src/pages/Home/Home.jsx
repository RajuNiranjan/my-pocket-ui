import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const url =
    "https://i.pinimg.com/236x/52/8a/5e/528a5e7733e7d7d3875b9f6b69aa7b70.jpg";

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios.get("/api/listings");
        const data = res.data;

        setLoading(false);
        setError(false);
        setListings(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="container m-auto flex flex-col gap-5 my-10">
        <h1 className="text-5xl font-bold flex-col text-slate-700">
          Find Your next <span className="text-slate-500">perfect</span> <br />{" "}
          place with ease
        </h1>
        <p className="text-slate-400">
          Mern_Real Estate will help you find your home fase, easy and
          confortable <br /> Our expert support are always available{" "}
        </p>
      </div>

      {/* <div
        className="h-[550px] w-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${url})` }}
      /> */}

      <div className="flex flex-wrap gap-4 mx-5">
        {loading
          ? "loading...."
          : listings.allListings?.map((item, index) => (
              <div
                key={index}
                className="w-[250px] h-[300px] border hover:shadow-lg rounded-lg overflow-hidden"
              >
                <div className="h-[50%]">
                  <Link to={`/listings/${item._id}`}>
                    <img
                      src={item.imageUrls[0]}
                      alt=""
                      className="w-full h-full bg-red-500 "
                    />
                  </Link>
                </div>
                <div className="p-2 flex flex-col justify-between h-[50%] ">
                  <Link
                    to={`/listings/${item._id}`}
                    className="text-lg font-bold"
                  >
                    {item.name}
                  </Link>
                  <div className="flex gap-2 w-full justify-start items-start  ">
                    <FaLocationDot className="text-green-600 w-[10%]" />
                    <h1 className="capitalize text-ellipsis line-clamp-2 w-[90%]">
                      {item.address}
                    </h1>
                  </div>

                  <small>{item.description}</small>
                  <div className="flex gap-4 items-center">
                    <h1>
                      <span>{item.bedRooms}</span>{" "}
                      <span>{item.bedRooms > 1 ? "Beds" : "Bed"}</span>
                    </h1>
                    <h1>
                      <span>{item.bathRooms}</span>{" "}
                      <span>{item.bathRooms > 1 ? "Baths" : "Bath"}</span>
                    </h1>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
