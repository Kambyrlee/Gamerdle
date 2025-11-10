import Tile from "./Tile";

function Row({ guess = ""}) {
    const letters = guess.padEnd(5).split("");

    return (
        <div className="row">
            {letters.map((char, i) => (
                <Tile key={i} letter={char.toUpperCase()}/>
            ))}
        </div>
    );
}

export default Row;