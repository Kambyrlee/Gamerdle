import { Play, Delete } from "lucide-react";

const KEYS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  ["Enter", ..."ZXCVBNM".split(""), "backspace"],
];
function Keyboard({ letterStatuses = {}, onKeyPress }) {
  return (
    <div className="keyboard">
      {KEYS.map((row, r) => (
        <div key={r} className="key-row">
          {row.map((key) => {
            const status = letterStatuses[key] || "";
            const isWide = key === "Enter" || key === "backspace";

            return (
              <button
                key={key}
                className={`key ${status} ${isWide ? "wide" : ""}`}
                data-key={key}
                onClick={() => onKeyPress?.(key)}
              >
                {key === "Enter" ? (
                  <span className="enter-label">⏎</span>
                ) : key === "backspace" ? (
                  <Delete size={24} />
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
