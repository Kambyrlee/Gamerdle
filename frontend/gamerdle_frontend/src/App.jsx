import { useState } from "react";
import Board from "./components/Board";

function App() {
  const [guesses, setGuesses] = useState(["STARE", "CLOUD"]);

  return (
    <div className="app">
      <h1>GAMERDLE</h1>
      <Board guesses={guesses}/>
    </div>
  );
}

export default App;