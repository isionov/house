import React, { useState } from "react";
import { server, useQuery } from "../../lib/api";
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
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const deleteListings = async (id: string) => {
    console.log("delete");
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTINGS,
      variables: {
        id,
      },
    });
    console.log(data);
    refetch();
  };

  const listings = data ? data.listings : null;
  const listingsList = listings
    ? listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => deleteListings(listing.id)}>
              delete listing
            </button>
          </li>
        );
      })
    : null;

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error</h2>;
  return (
    <div>
      <h2>{title}</h2>
      <ul>{listingsList}</ul>
    </div>
  );
};
