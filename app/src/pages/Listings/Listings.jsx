import { useState } from "react";
import axios from "axios";

const Listings = () => {
  const [listingFormData, setListingFormData] = useState({
    name: "",
    description: "",
    address: "",
    sale: false,
    offer: false,
    furnished: false,
    parking: false,
    rent: false,
    bedRooms: "",
    bathRooms: "",
    regularPrice: "",
    discountPrice: "",
    images: [],
  });

  const [errors, setErrors] = useState({});

  const onChangeListingInput = (e) => {
    const { name, value, type, checked, files } = e.target;
    setListingFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentErrors = {};

    // Check required fields
    [
      "name",
      "description",
      "address",
      "bedRooms",
      "bathRooms",
      "regularPrice",
      "discountPrice",
    ].forEach((field) => {
      if (!listingFormData[field]) {
        currentErrors[field] = true;
      }
    });

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length > 0) return;

    try {
      const res = await axios.post(
        "/api/listings/createListing",
        listingFormData
      );
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center my-7">Create Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4">
          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col gap-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className={`border ${
                errors.name ? "border-red-500" : "border-black"
              } rounded-lg p-3`}
              value={listingFormData.name}
              onChange={onChangeListingInput}
              required
            />
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              className={`border ${
                errors.description ? "border-red-500" : "border-black"
              } rounded-lg p-3 resize-none`}
              value={listingFormData.description}
              onChange={onChangeListingInput}
              required
            />
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              className={`border ${
                errors.address ? "border-red-500" : "border-black"
              } rounded-lg p-3`}
              value={listingFormData.address}
              onChange={onChangeListingInput}
              required
            />
            <ul className="flex flex-wrap gap-4 items-center">
              {["sale", "offer", "furnished", "parking", "rent"].map(
                (option) => (
                  <li key={option} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      name={option}
                      id={option}
                      className="w-5 h-5 cursor-pointer"
                      checked={listingFormData[option]}
                      onChange={onChangeListingInput}
                    />
                    <span className="font-medium capitalize">{option}</span>
                  </li>
                )
              )}
            </ul>
            <ul className="flex flex-wrap items-center gap-4">
              <li className="flex items-center gap-2">
                <input
                  type="number"
                  name="bedRooms"
                  id="bedRooms"
                  min={1}
                  max={10}
                  className={`border ${
                    errors.bedRooms ? "border-red-500" : "border-black"
                  } rounded-lg w-14 p-2`}
                  value={listingFormData.bedRooms}
                  onChange={onChangeListingInput}
                />
                <span>Bed Rooms</span>
              </li>
              <li className="flex items-center gap-2">
                <input
                  type="number"
                  name="bathRooms"
                  id="bathRooms"
                  min={1}
                  max={10}
                  className={`border ${
                    errors.bathRooms ? "border-red-500" : "border-black"
                  } rounded-lg w-14 p-2`}
                  value={listingFormData.bathRooms}
                  onChange={onChangeListingInput}
                  required
                />
                <span>Bath Rooms</span>
              </li>
              <li className="flex items-center gap-2">
                <input
                  type="text"
                  name="regularPrice"
                  id="regularPrice"
                  className={`border ${
                    errors.regularPrice ? "border-red-500" : "border-black"
                  } rounded-lg w-32 p-2`}
                  value={listingFormData.regularPrice}
                  onChange={onChangeListingInput}
                  required
                />
                <span>Regular Price</span>
              </li>
              <li className="flex items-center gap-2">
                <input
                  type="text"
                  name="discountPrice"
                  id="discountPrice"
                  className={`border ${
                    errors.discountPrice ? "border-red-500" : "border-black"
                  } rounded-lg w-32 p-2`}
                  value={listingFormData.discountPrice}
                  onChange={onChangeListingInput}
                  required
                />
                <span>Discounted Price</span>
              </li>
            </ul>
          </div>
          {/* RIGHT COLUMN */}
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
                onChange={onChangeListingInput}
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-slate-600 w-full rounded-md my-2 text-white font-bold tracking-wider">
              CREATE LISTING
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Listings;
