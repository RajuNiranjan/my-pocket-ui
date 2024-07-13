import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../fire_base";
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

  const onChangeListingInput = (e) => {
    const { name, value, type, checked } = e.target;
    setListingFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setListingFormData((prev) => ({
            ...prev,
            images: [...prev.images, downloadURL],
          }));
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", listingFormData);
    const res = await axios.post(
      "/api/listings/createListing",
      listingFormData
    );
    const data = res.data;
    console.log("listing data", data);
  };

  return (
    <div>
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
              className="border border-black rounded-lg p-3"
              value={listingFormData.name}
              onChange={onChangeListingInput}
              required
            />
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              className="border border-black rounded-lg p-3 resize-none"
              value={listingFormData.description}
              onChange={onChangeListingInput}
              required
            />
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              className="border border-black rounded-lg p-3"
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
                  className="border border-black rounded-lg w-14 p-2"
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
                  className="border border-black rounded-lg w-14 p-2"
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
                  className="border border-black rounded-lg w-32 p-2"
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
                  className="border border-black rounded-lg w-32 p-2"
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
                onChange={handleImageChange}
                multiple
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-slate-600 w-full rounded-md my-2 text-white font-bold tracking-wider"
            >
              CREATE LISTING
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Listings;
