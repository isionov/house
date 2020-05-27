import merge from "lodash.merge";
import { listingResolvers } from "./Listing";
import { IResolvers } from "apollo-server-express";

export const resolvers: IResolvers = merge(listingResolvers);
