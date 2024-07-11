import { useState } from "react";
import axios from "axios";

const Listings = () => {
  const [formData, setFormData] = useState({
    images: [],
    name: "",
    description: "",
    address: "",
    sell: false,
    rent: false,
    parking: false,
    furnitured: false,
    offer: false,
    bedRooms: "",
    bathRooms: "",
    regularPrice: "",
    discountPrice: "",
    userRef: "", // Add userRef field if required by your schema
    type: "", // Add type field if required by your schema
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/listing/create", formData);
      const data = res.data;
      console.log("listing data", data);
    } catch (error) {
      console.error("Error creating listing:", error.response.data);
    }
  };

  return (
    <main>
      <h1 className="text-center text-xl font-bold">Create Listings</h1>

      {/* LEFT  */}
      <form className="grid grid-cols-2 p-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            type="file"
            name="images"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <input
            type="text"
            name="name"
            id="name"
            className="focus:outline-none rounded-md border border-black p-1"
            maxLength={62}
            minLength={10}
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            id="description"
            className="focus:outline-none resize-none rounded-md border border-black p-1"
            maxLength={62}
            minLength={10}
            placeholder="Description"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            id="address"
            className="focus:outline-none rounded-md border border-black p-1"
            maxLength={62}
            minLength={10}
            placeholder="Address"
            required
            value={formData.address}
            onChange={handleChange}
          />

          {/* CHECKBOX */}

          <div className="flex flex-wrap gap-4">
            {["sell", "rent", "parking", "furnitured", "offer"].map((field) => (
              <div key={field} className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  name={field}
                  id={field}
                  className="w-5 h-7"
                  checked={formData[field]}
                  onChange={handleChange}
                />
                <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  name="bedRooms"
                  id="bedRooms"
                  className="focus:outline-none w-14 text-center rounded-md border border-black p-1"
                  value={formData.bedRooms}
                  onChange={handleChange}
                />
                <p>Bed Rooms</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="bathRooms"
                  id="bathRooms"
                  className="focus:outline-none w-14 text-center rounded-md border border-black p-1"
                  value={formData.bathRooms}
                  onChange={handleChange}
                />
                <p>Bath Rooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="regularPrice"
                id="regularPrice"
                className="focus:outline-none w-20 text-center rounded-md border border-black p-1"
                value={formData.regularPrice}
                onChange={handleChange}
              />
              <p>Regular Price</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="discountPrice"
                id="discountPrice"
                className="focus:outline-none w-20 text-center rounded-md border border-black p-1"
                value={formData.discountPrice}
                onChange={handleChange}
              />
              <p>Discount Price</p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="col-span-2 mt-4 p-2 bg-blue-500 text-white rounded-md">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Listings;
