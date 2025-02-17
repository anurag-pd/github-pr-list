import React, { useState } from "react";
import PRList from "./components/PRList/PRList";
import "./App.css";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="App">
      <h1 className="headLine">Pull Requests</h1>
      {isLoading ? <p>Loading...</p> : <PRList />}
    </div>
  );
};

export default App;
