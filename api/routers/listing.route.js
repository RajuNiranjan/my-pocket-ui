import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyAccessToken } from "../../utils/verifyUser.js";

export const listingRouter = express.Router();

listingRouter.post("/create", verifyAccessToken, createListing);
