import './App.css';
import Bingo from './Bingo/Bingo';
import { useEffect, useState } from 'react';
import React from 'react';

const boards = require('./board-config.json'); 


function App() {
  
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
      <header id="title">
        JINGO
      </header>
      <div id="content">
        <Bingo boardConfig={useBoardConfig()} />
      </div>
    </div>
  );
}

export default App;
