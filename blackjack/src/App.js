import "./App.css";
import BlackjackGame from "./components/BlackJack/BlackJack";
import Header from "./components/Header/header";

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Black Jack</h1>
      <BlackjackGame />
    </div>
  );
}

export default App;
