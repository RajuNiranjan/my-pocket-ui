import ListingModel from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    console.log("coming here");
    const newListing = await ListingModel.create(req.body);
    return res.status(201).json({ newListing: newListing });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
