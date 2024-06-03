import isSoft17 from "./isSoft17";
import hit from "./hit";

const dealerTurn = async (state, dispatch) => {
  try {
    let score = state.dealerScore;
    if (isSoft17(state.dealerHand)) {
      await hit(state, dispatch);
      console.log("IS SOFT 17, MUST HIT!");
      setTimeout(() => {}, 500);
    } else if (score < 17) {
      await hit(state, dispatch);
      setTimeout(() => {}, 500);
    }
    //End dealer turn if score is 17 or higher
    if (state.dealerScore >= 17) {
      dispatch({ type: "SET_DEALER_TURN", payload: false });
      dispatch({ type: "SET_ROUND_ENDED", payload: true });
      console.log("Dealer TURN ENDED");
    }
  } catch (err) {
    console.error(err);
  }
};

export default dealerTurn;
