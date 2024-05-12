const split = (state, dispatch) => {
  console.log("I'm SPLITTING!");
  const playerHand = [...state.playerHands];
  const newSplitHand = [...state.splitHand];

  let secondCard = playerHand.pop();
  let firstCard = playerHand.pop();

  newSplitHand[0].push(firstCard);
  newSplitHand[1].push(secondCard);
  console.log("Now returning new state");
  console.log(newSplitHand);
  dispatch({ type: "SET_SPLIT_HAND", payload: true });
  //   return {
  //     ...state,
  //     splitHand: newSplitHand,
  //   };
  //setTimeout(() => {}, 500);
  //   for (let i = 0; i < state.splitHand.length; i++) {
  //     // Log the index of the nested array
  //     console.log(`Split Hand ${i + 1}:`);

  //     // Log the contents of the nested array
  //     console.log(state.splitHand[i]);
  //   }
};

export default split;
