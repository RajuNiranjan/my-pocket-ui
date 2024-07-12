import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyAccessToken } from "../../utils/verifyUser.js";

export const listingRoute = express.Router();

listingRoute.post("/createListing", verifyAccessToken, createListing);
