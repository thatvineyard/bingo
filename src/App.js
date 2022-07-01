import './App.css';
import Bingo from './Bingo';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';

const boards = {
  board1: [ // Ym9hcmQx
    [
      "NÅGON FÖLL UNDER BORDET",
      "NÅGON SÖP PÅ GRANNENS FISK",
      "GUBBYOGA MED STRUMPOR OCH SANDALER",
      "VÄSTGÖTAKLIMAX VID STH - ENTRÉN",
    ], [
      "HALVAN KOM FÖRE TERSEN MEN EFTER HELAN",
      "BR DUMANSKI SLOG BR WEIBORG PÅ KÄFTEN",
      "DALA SPELADE INTE PÅ SIN JÄTTETRUMPET",
      "KAPITELMEDALJEN BLEV OFFICIELL",
    ], [
      "BR WILHELMSSON SKREV NY MUSIK OCH TEXT",
      "BÅDE STH OCH LCM BAR FEZ",
      "FINNEN KENNETH KOM PÅ BESÖK",
      "KORVEN BLEV OFRIVILLIGT GRATTIS",
    ], [
      "MANLIGT BEHÄRSKAD GLÄDJE FANNS",
      "GOD MAT",
      "BRÄNN BRON SA TERSEN ",
      "BR KOUADRI BJÖD PÅ JÄTTEÄCKLIG SPRIT",
    ],
  ],
  board2: [ // Ym9hcmQy
    [
      "KORVEN BLEV OFRIVILLIGT GRATTIS",
      "BR WILHELMSSON SKREV NY MUSIK OCH TEXT",
      "FINNEN KENNETH KOM PÅ BESÖK",
      "VÄSTGÖTAKLIMAX VID STH-ENTRÉN",
    ], [
      "HALVAN KOM FÖRE TERSEN MEN EFTER HELAN",
      "BR DUMANSKI SLOG WEIBORG PÅ KÄFTEN",
      "DALA SPELADE INTE PÅ SIN JÄTTETRUMPET",
      "KAPITELMEDALJEN BLEV OFFICIELL",
    ], [
      "BÅDE STH OCH LCM BAR FEZ",
      "NÅGON SÖP PÅ GRANNENS FESK",
      "GUBBYOGA MED STRUMPOR OCH SANDALER",
      "NÅGON FÖLL UNDER BORDET",
    ], [
      "MANLIGT BEHÄRSKAD GLÄDJE FANNS",
      "GOD MAT",
      "BRÄNN BRON SA TERSEN",
      "BR KOUADRI BJÖD PÅ JÄTTEÄCKLIG SPRIT",
    ],
  ],
  default: [
    [
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
    ], [
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
    ], [
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
    ], [
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
    ], [
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
    ],
  ]
}

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
      <header className="App-header">
        JINGO
      </header>
      <Bingo boardConfig={useBoardConfig()} />
    </div>
  );
}

export default App;
