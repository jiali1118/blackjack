import React from "react";

const RenderSplitHand = (props) => {
  return props.splitHand.map((nestedArray, index) => (
    <div key={index}>
      {nestedArray.map((card, nestedIndex) => (
        <img
          key={nestedIndex}
          src={card.image}
          alt={`${card.value} of ${card.suit}`}
          style={{ width: "100px", margin: "5px" }} // Adjust styling as needed
        />
      ))}
    </div>
  ));
};

export default RenderSplitHand;
