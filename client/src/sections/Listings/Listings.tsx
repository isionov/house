import React from "react";
import { server } from "../../lib/api";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTINGS = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings: React.FC<Props> = ({ title }) => {
  const fetchListings = async () => {
    console.log("fetch");
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data.listings);
  };
  const deleteListings = async () => {
    console.log("delete");
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTINGS,
      variables: {
        id: "5ecdfc11a7cb331655b29758",
      },
    });
    console.log(data);
  };
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Fetch</button>
      <button onClick={deleteListings}>Delete</button>
    </div>
  );
};
