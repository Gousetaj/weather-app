import React, { useState } from "react";
import Weather from "./components/Weather";

const App: React.FC = () => {
  const [city, setCity] = useState("London");

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", margin: "10px", width: "200px" }}
      />
      <Weather city={city} />
    </div>
  );
};

export default App;
