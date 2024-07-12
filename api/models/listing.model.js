import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
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
    bathRoom: {
      type: Number,
      required: true,
    },
    bedRoom: {
      type: Number,
      required: true,
    },
    furniture: {
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
    imageURLS: {
      type: Array,
      required: true,
    },
    useRef: {
      type: String,
      required: true,
    },
  },
  { timeseries: true, timestamps: true }
);
const ListingModel = mongoose.model("Listing", listingSchema);

export default ListingModel;
