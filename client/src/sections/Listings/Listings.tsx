import React, { useState } from "react";
import { useQuery, useMutation } from "../../lib/api";
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

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTINGS);

  const handleDeleteListings = async (id: string) => {
    await deleteListing({ id });
    refetch();
  };

  const listings = data ? data.listings : null;
  const listingsList = listings
    ? listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => handleDeleteListings(listing.id)}>
              delete listing
            </button>
          </li>
        );
      })
    : null;

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error</h2>;

  const deleteListingLoadingMsg = deleteListingLoading ? (
    <h4>Deletion on progress...</h4>
  ) : null;
  const deleteListingLoadingError = deleteListingError ? (
    <h4>Deletion failed</h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {deleteListingLoadingMsg || deleteListingLoadingError}
      <ul>{listingsList}</ul>
    </div>
  );
};
