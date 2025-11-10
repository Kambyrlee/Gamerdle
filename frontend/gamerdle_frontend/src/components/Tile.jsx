function Tile({ letter = "", status = ""}) {
    const getClassName = () => {
        switch (status) {
            case "correct":
                return "tile correct";
            case "present":
                return "tile present";
            case "absent":
                return "tile absent"
            default:
                return "tile";
        }
    };
    return (
        <div className={getClassName()}>
            {letter}
        </div>
    );
}

export default Tile;