import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  bathRooms: {
    type: Number,
    required: true,
  },
  bedRooms: {
    type: Number,
    required: true,
  },
  furnitured: {
    type: Boolean,
    required: true,
  },
  parking: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  offer: {
    type: Boolean,
    required: true,
  },
  imageURL: {
    type: Array,
    required: true,
  },
  useRef: {
    type: String,
    required: true,
  },
});
const ListingModel = mongoose.model("Listing", listingSchema);

export default ListingModel;
