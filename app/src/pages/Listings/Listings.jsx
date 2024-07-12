import React from "react";

const Listings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-7">Crate Listing</h1>
      <form>
        <div className="flex flex-wrap gap-4">
          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="border border-black rounded-lg p-3 "
            />
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              className="border border-black rounded-lg p-3 resize-none "
            />
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              className="border border-black rounded-lg p-3 "
            />
            <ul className="flex flex-wrap gap-4 items-center">
              <li className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="sale"
                  id="sale"
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="font-medium">Sele</span>
              </li>
              <li className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="font-medium">Offer</span>
              </li>
              <li className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="font-medium">Furnished</span>
              </li>
              <li className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="font-medium">Parking</span>
              </li>
              <li className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="rent"
                  id="rent"
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="font-medium">Rent</span>
              </li>
            </ul>

            <ul className="flex flex-wrap  items-center gap-4">
              <li className="flex items-center gap-2">
                <input
                  type="number"
                  name="bedroom"
                  id="bedroom"
                  min={1}
                  max={10}
                  className="border border-black rounded-lg w-14 p-2"
                />
                <span>Bed Rooms</span>
              </li>
              <li className="flex items-center gap-2">
                <input
                  type="number"
                  name="bathroom"
                  id="bathroom"
                  min={1}
                  max={10}
                  className="border border-black rounded-lg w-14 p-2"
                />
                <span>Bath Rooms</span>
              </li>
              <li className="flex items-center gap-2">
                <input
                  type="text"
                  name="regularprice"
                  id="regularprice"
                  min={1}
                  max={10}
                  className="border border-black rounded-lg w-32 p-2"
                />
                <span>Regular Price</span>
              </li>
              <li className="flex items-center gap-2">
                <input
                  type="text"
                  name="discountprice"
                  id="discountprice"
                  min={1}
                  max={10}
                  className="border border-black rounded-lg w-32 p-2"
                />
                <span>Discounted Price</span>
              </li>
            </ul>
          </div>
          {/* RIGHT */}
          <div className="flex-1 flex flex-col gap-4">
            <h1>
              <b>Images:</b> The first image will be the cover (max 6)
            </h1>
            <div className="flex gap-4 items-center">
              <input
                type="file"
                name="images"
                id="images"
                accept="image/*"
                multiple
              />
              <button className="border border-green-400 text-green-400 p-2 font-bold rounded-md hover:shadow-lg disabled:opacity-80">
                Upload
              </button>
            </div>
            <button
              type="submit"
              className="p-2 bg-slate-600 w-full rounded-md my-2 text-white font-bold tracking-wider">
              CRATE LISTING
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Listings;
