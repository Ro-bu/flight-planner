import React from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearhBar";

function App() {
  const [showTitle, setShowTitle] = React.useState(true);

  return (
    <div className="main-container">
      <Header />
      {showTitle &&
      <h2 className="starting-title">
        Choose your next flight
      </h2>}
      <SearchBar />
    </div>
  );
}

export default App;
