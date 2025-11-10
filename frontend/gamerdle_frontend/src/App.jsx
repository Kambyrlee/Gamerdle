import { useEffect, useState } from "react";
import { getBackendMessage } from "./services/api";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    getBackendMessage()
      .then((data) => setMessage(data))
      .catch((error) => {
        console.error("Error fetching backend message:", error);
        setMessage("Error connecting to backend");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Gamerdle</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
