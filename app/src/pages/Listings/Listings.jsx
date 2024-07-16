import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../fire_base";

const Listings = () => {
  const [files, setFiles] = useState([]);
  const [listingFormData, setListingFormData] = useState({
    imageUrls: [],
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log("form data", listingFormData);

  const handleUploadImage = () => {
    if (
      files.length > 0 &&
      files.length + listingFormData.imageUrls.length < 7
    ) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setListingFormData({
            ...listingFormData,
            imageUrls: listingFormData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)", err);
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setListingFormData({
      ...listingFormData,
      imageUrls: listingFormData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <div className="p-5">
        <h1 className="text-xl font-bold text-center">Create Listing</h1>
        {/* LISTING FORM */}
        <form>
          <div className="flex  flex-wrap gap-4 my-5">
            {/* LEFT FORM INFO */}
            <div className="flex-1 flex flex-col gap-4">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="p-3 border rounded-lg"
                maxLength="62"
                minLength="10"
                required
              />
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                className="p-3 border rounded-lg resize-none"
                required
              />
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                className="p-3 border rounded-lg"
                maxLength="62"
                minLength="10"
                required
              />

              {/* CHECK BOX  */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="sell"
                    id="sell"
                    className="h-5 w-5"
                  />
                  <h1>Sell</h1>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="rent"
                    id="rent"
                    className="h-5 w-5"
                  />
                  <h1>Rent</h1>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="parking"
                    id="parking"
                    className="h-5 w-5"
                  />
                  <h1>Parking Spot</h1>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="furnitured"
                    id="furnitured"
                    className="h-5 w-5"
                  />
                  <h1>Furnitured</h1>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="offer"
                    id="offer"
                    className="h-5 w-5"
                  />
                  <h1>offer</h1>
                </div>
              </div>
              {/* BED BATH PRICINGS  */}
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    name="bebRooms"
                    id="bedRooms"
                    min={1}
                    max={10}
                    className="p-3 w-4xl border rounded-lg"
                    required
                  />
                  <h1>Bed Rooms</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    name="bathRooms"
                    id="bathRooms"
                    min={1}
                    max={10}
                    className="p-3 w-4xl border rounded-lg"
                    required
                  />
                  <h1>Bath Rooms</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    name="regularPrice"
                    id="regularPrice"
                    min={1}
                    max={10}
                    className="p-3 w-[150px] border rounded-lg"
                    required
                  />
                  <h1>Regular Price</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    name="discountPrice"
                    id="discountPrice"
                    min={1}
                    max={10}
                    className="p-3 w-[150px] border rounded-lg"
                    required
                  />
                  <h1>Discount Price</h1>
                </div>
              </div>
            </div>
            {/* IMAGE UPLOAD FORM  */}
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="my-2">
                <b>Note : </b>
                The first Imgage will be the cover (max 6)
              </h1>
              <div className="border rounded-lg p-2 flex justify-between items-center">
                <input
                  type="file"
                  name="images"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
                <button
                  type="button"
                  onClick={handleUploadImage}
                  className="bg-green-500 text-white p-1 rounded-lg"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              <p className="text-red-700 text-sm">
                {imageUploadError && imageUploadError}
              </p>
              {listingFormData.imageUrls.length > 0 &&
                listingFormData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-3 border items-center"
                  >
                    <img
                      src={url}
                      alt="listing image"
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              <p>{}</p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gray-600 w-full p-3 rounded-lg text-white font-bold"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default Listings;
