import calculateHand from "./calculateHand";

const split = (state, dispatch, index) => {
  console.log("I'm SPLITTING!");
  const playerHand = [...state.playerHands];
  const newSplitHand = [...state.splitHand];

  let secondCard = playerHand.pop();
  let firstCard = playerHand.pop();

  let firstHand = { hand: [firstCard], score: firstCard.value };
  let secondHand = { hand: [secondCard], score: secondCard.value };

  newSplitHand.push(firstHand);
  newSplitHand.push(secondHand);
  console.log("Now returning new state");
  console.log(newSplitHand);
  console.log(newSplitHand[0].hand[0]);
  dispatch({ type: "SET_SPLIT_HAND", payload: true });
  dispatch({ type: "UPDATE_SPLIT_HAND", payload: newSplitHand });
  dispatch({ type: "CALCULATE_SPLIT" });
};

export default split;
