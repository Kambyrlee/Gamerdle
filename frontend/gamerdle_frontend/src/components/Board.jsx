import Row from "./Row"

function Board({ guesses = [] }) {
    const rows = [...guesses];
    while (rows.length < 6) rows.push("");

    return (
        <div className="board">
            {rows.map((guess, i) => (
                <Row key={i} guess={guess}/>
            ))}
        </div>
    );
}

export default Board;