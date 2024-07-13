import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    regularPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    bathRoom: {
      type: Number,
    },
    bedRoom: {
      type: Number,
    },
    furniture: {
      type: Boolean,
    },
    parking: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    offer: {
      type: Boolean,
    },
    imageURLS: {
      type: Array,
    },
    useRef: {
      type: String,
    },
  },
  { timeseries: true, timestamps: true }
);
const ListingModel = mongoose.model("Listing", listingSchema);

export default ListingModel;
