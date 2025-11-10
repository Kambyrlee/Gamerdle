import { useEffect, useRef, useState } from "react";
import Board from "./components/Board";

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currGuess, setCurrGuess] = useState("");
  const currGuessRef = useRef(currGuess);

  useEffect(() => {
  currGuessRef.current = currGuess;
}, [currGuess]);


  useEffect(() => {
    function handleKeyDown(e) {
      const key = e.key.toLowerCase();
      if (/^[a-z]$/.test(key)) {
        setCurrGuess(prev => (prev.length < 5 ? prev + key : prev))
      }
      if (key === "backspace") {
        setCurrGuess(prev => prev.slice(0, -1));
      }
      if (key === "enter") {
        console.log("Submit guess: " + currGuessRef.current);
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="app">
      <h1>GAMERDLE</h1>
      <Board guesses={guesses} currGuess={currGuess}/>
    </div>
  );
}

export default App;