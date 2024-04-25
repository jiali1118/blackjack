import React from "react";

const hit = (deckID) => {
  try {
    const { data, error } = fetchCard(deckID); // Call fetchCard synchronously
    if (error) {
      console.error("Error fetching card:", error);
      return null;
    }

    // Perform action with the fetched card data
    console.log("Fetched card data:", data);

    // Return the fetched card data
    return data;
  } catch (error) {
    console.error("Error fetching card:", error);
    return null;
  }
};

export default hit;
