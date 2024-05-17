import calculateHand from "./calculateHand";

const split = (state, dispatch, index) => {
  console.log("I'm SPLITTING!");
  const playerHand = [...state.playerHands];
  const newSplitHand = [...state.splitHand];
  let firstCard;
  let secondCard;
  if (!state.handIsSplit) {
    let secondCard = playerHand.pop();
    let firstCard = playerHand.pop();
    let firstHand = {
      hand: [firstCard],
      score: firstCard.value,
      bet: state.betAmount,
    };
    let secondHand = {
      hand: [secondCard],
      score: secondCard.value,
      bet: state.betAmount,
    };

    newSplitHand.push(firstHand);
    newSplitHand.push(secondHand);
  } else {
    let secondCard = newSplitHand[index].hand.pop();
    let secondHand = {
      hand: [secondCard],
      score: secondCard.value,
      bet: state.betAmount,
    };
    newSplitHand.push(secondHand);
  }

  dispatch({ type: "SET_SPLIT_HAND", payload: true });
  dispatch({ type: "UPDATE_SPLIT_HAND", payload: newSplitHand });
  dispatch({ type: "CALCULATE_SPLIT" });
};

export default split;
