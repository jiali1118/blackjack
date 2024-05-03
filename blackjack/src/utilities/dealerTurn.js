import isSoft17 from "./isSoft17";
import hit from "./Hit";
import calculateHand from "./CalculateHand";
const dealerTurn = async (
  dealerHand,
  dealerScore,
  setDealerHand,
  deckId,
  setDealerScore,
  setIsDealerTurn
) => {
  let score = dealerScore;
  while (!isSoft17(dealerHand) && score < 17) {
    score = await hit(deckId, setDealerHand, dealerHand, setDealerScore);
    setTimeout(() => {}, 100);
  }
  setIsDealerTurn(false);
  console.log("Dealer Turn is over!");
};

export default dealerTurn;
