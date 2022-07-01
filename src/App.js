import './App.css';
import Bingo from './Bingo/Bingo';
import { useEffect, useState } from 'react';
import React from 'react';
import BingoLineOverlay from './Bingo/BingoLineOverlay';

const boards = require('./board-config.json');


function App() {

  //  
  // userBoardConfig  
  // Looks at the query parameter `board` and base64 decodes
  // it and grabs the board config from the json file.
  const useBoardConfig = () => {
    const [boardId, setBoardId] = useState(null)

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      setBoardId(() => {
        try {
          return window.atob(params.get("board"))
        } catch (err) {
          return ""
        }
      });
    }, [])

    return boards[boardId] || boards.default;
  }

  return (
    <div className="App">
      <div id="title">
        <header>
          JINGO
        </header>
        <BingoLineOverlay 
          completeLines={[{ direction: "row", index: 0 }]} 
          color="217, 221, 228" 
          opacity="1"
        />
      </div>
      <div id="content">
        <Bingo boardConfig={useBoardConfig()} />
      </div>
    </div>
  );
}

export default App;
