import isSoft17 from "./isSoft17";
import hit from "./hit";
import calculateHand from "./calculateHand";
const dealerTurn = async (state, dispatch) => {
  let score = state.dealerScore;
  if (!isSoft17(state.dealerHand) && score < 17) {
    await hit(state, dispatch);
    setTimeout(() => {}, 100);
  }
  if (state.dealerScore >= 17) {
    dispatch({ type: "SET_DEALER_TURN", payload: false });
    dispatch({ type: "SET_ROUND_ENDED", payload: true });
    console.log("Dealer TURN ENDED");
  }
};

export default dealerTurn;
