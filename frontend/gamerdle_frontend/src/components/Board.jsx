import Row from "./Row";

function Board({ guesses = [], currGuess = "" }) {
  const rows = guesses.map((g) => g.word);
  if (rows.length < 6) {
    rows.push(currGuess);
  }
  while (rows.length < 6) rows.push("");

  console.log("Board rows: ", rows);

  return (
    <div className="board">
      {guesses.map((g, i) => (
        <Row key={i} guess={g.word} result={g.result} />
      ))}
      {guesses.length < 6 && <Row guess={currGuess} />} {/* active row */}
      {Array.from({ length: 5 - guesses.length - 1 }).map((_, i) => (
        <Row key={`empty-${i}`} guess="" />
      ))}
    </div>
  );
}

export default Board;