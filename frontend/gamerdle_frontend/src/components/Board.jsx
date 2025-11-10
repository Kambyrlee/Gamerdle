import Row from "./Row"

function Board({ guesses = [], currGuess="" }) {
    const rows = [...guesses];
    if (rows.length < 6) {
        rows.push(currGuess);
    }
    while (rows.length < 6) rows.push("");

    console.log("Board rows: ", rows);

    return (
        <div className="board">
            {rows.map((guess, i) => (
                <Row key={i} guess={guess}/>
            ))}
        </div>
    );
}

export default Board;