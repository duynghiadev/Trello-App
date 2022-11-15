import React from "react";
import "./App.scss";
import AppBar from "components/AppBar/Appbar";
import BoardBar from "components/BoardBar/BoardBar";
import BoardContent from "components/BoardContent/BoardContent";

function App() {
  return (
    <div className="trello-duynghia-master">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default App;
