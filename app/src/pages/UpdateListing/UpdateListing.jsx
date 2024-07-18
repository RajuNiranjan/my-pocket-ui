import { useEffect, useState } from "react";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../fire_base";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);

  const { id } = useParams();

  const [files, setFiles] = useState([]);
  const [listingFormData, setListingFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: 5000,
    discountPrice: 500,
    bathRooms: 1,
    bedRooms: 1,
    furnitured: false,
    parking: false,
    type: "rent",
    offer: false,
    imageUrls: [],
    useRef: currentUser.user._id,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setListingFormData({
        ...listingFormData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnitured" ||
      e.target.id === "offer"
    ) {
      setListingFormData({
        ...listingFormData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setListingFormData({
        ...listingFormData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmitListingForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await axios.patch(
        `/api/listings/updateListing/${id}`,
        listingFormData
      );
      const data = res.data;
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/listings/getListing/${id}`);
        const data = res.data;
        setListingFormData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  return (
    <div>
      <div className="p-5">
        <h1 className="text-xl font-bold text-center">Create Listing</h1>
        {/* LISTING FORM */}
        <form onSubmit={handleSubmitListingForm}>
          <div className="flex  flex-wrap gap-4 my-5">
            {/* LEFT FORM INFO */}
            <div className="flex-1 flex flex-col gap-4">
              <input
                type="text"
                name="name"
                id="name"
                value={listingFormData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="p-3 border rounded-lg"
                maxLength="62"
                minLength="10"
                required
              />
              <textarea
                name="description"
                id="description"
                value={listingFormData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="p-3 border rounded-lg resize-none"
                required
              />
              <input
                type="text"
                name="address"
                id="address"
                value={listingFormData.address}
                onChange={handleInputChange}
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
                    checked={listingFormData.type === "sell"}
                    onChange={handleInputChange}
                    className="h-5 w-5"
                  />
                  <h1>Sell</h1>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="rent"
                    id="rent"
                    checked={listingFormData.type === "rent"}
                    onChange={handleInputChange}
                    className="h-5 w-5"
                  />
                  <h1>Rent</h1>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="parking"
                    id="parking"
                    checked={listingFormData.parking}
                    onChange={handleInputChange}
                    className="h-5 w-5"
                  />
                  <h1>Parking Spot</h1>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="furnitured"
                    id="furnitured"
                    checked={listingFormData.furnitured}
                    onChange={handleInputChange}
                    className="h-5 w-5"
                  />
                  <h1>Furnitured</h1>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="offer"
                    id="offer"
                    checked={listingFormData.offer}
                    onChange={handleInputChange}
                    className="h-5 w-5"
                  />
                  <h1>Offer</h1>
                </div>
              </div>
              {/* BED BATH PRICINGS  */}
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    name="bedRooms"
                    id="bedRooms"
                    value={listingFormData.bedRooms}
                    onChange={handleInputChange}
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
                    value={listingFormData.bathRooms}
                    onChange={handleInputChange}
                    min={1}
                    max={10}
                    className="p-3 w-4xl border rounded-lg"
                    required
                  />
                  <h1>Bath Rooms</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    name="regularPrice"
                    id="regularPrice"
                    value={listingFormData.regularPrice}
                    onChange={handleInputChange}
                    min={500}
                    max={10000}
                    className="p-3 w-[150px] border rounded-lg"
                    required
                  />
                  <h1>Regular Price</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    name="discountPrice"
                    id="discountPrice"
                    value={listingFormData.discountPrice}
                    onChange={handleInputChange}
                    min={500}
                    max={10000}
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
                The first image will be the cover (max 6)
              </h1>
              <div className="border rounded-lg p-2 flex justify-between items-center">
                <input
                  type="file"
                  name="images"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files))}
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
            </div>
          </div>
          <button
            type="submit"
            className="bg-gray-600 w-full p-3 rounded-lg text-white font-bold"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateListing;
