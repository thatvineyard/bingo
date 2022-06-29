import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';

const kort1 = [
  [
    "NÅGON FÖLL UNDER BORDET",
    "NÅGON SÖP PÅ GRANNENS FISK",
    "GUBBYOGA MED STRUMPOR OCH SANDALER",
    "VÄSTGÖTAKLIMAX VID STH - ENTRÉN",
  ], [
    "HALVAN KOM FÖRE TERSEN MED EFTER HELAN",
    "BR DUMANSKI SLOG BR WEIBORG PÅ KÄFTEN",
    "DALA SPELADE INTE PÅ SIN JÄTTETRUMPET",
    "KAPITELMEDALJEN BLEV OFFICIELL",
  ], [
    "BR WILHELMSSON SKREV NY MUSIK OCH TEXT",
    "BÅDE STH OCH LCM BAR FEZ",
    "FINNEN KENNETH KOM PÅ BESÖK",
    "KORVEN BLEV OFRIVILLIGT GRATTIS",
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
]

const kort2 = [
  [
    "KORVEN BLEV OFRIVILLIGT GRATTIS",
    "BR WILHELMSSON SKREV NY MUSIK OCH TEXT",
    "FINNEN KENNETH KOM PÅ BESÖK",
    "VÄSTGÖTAKLIMAX VID STH-ENTRÉN",
  ], [
    "HALVAN KOM FÖRE TERSEN MED EFTER HELAN",
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
]


function App() {
  return (
    <div className="App">
      <header className="App-header">
        JINGO
      </header>
      <Grid card={kort1} />
    </div>
  );
}

function calcDimensions(card) {
  let rows = card.length;
  let columns = card.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.length),
    0
  );
  return [rows, columns];
}

function Grid(props) {
  const [rows, columns] = calcDimensions(props.card)
  const getText = (row, column) => (props.card[row][column] || "Gratis Ruta")
  const [clickedSquares, setClickedSquares] = useState([])
  const getClicked = (row, column) => (clickedSquares.includes(`${row}-${column}`))
  const setClicked = (row, column) => {
    setClickedSquares((prevClickedSquares) => {
      if (getClicked(row, column)) {
        return prevClickedSquares.filter(e => e !== `${row}-${column}`)
      } else {
        return prevClickedSquares.concat([`${row}-${column}`])
      }
    })
  }
  const winningDirection = "column"
  const winningOffset = 1
  const calcBarOffset = () => {
    switch (winningDirection) {
      case "row":
        return ((1 + rows % 2) * (winningOffset) / (rows * 2))
        break;
      case "column":
        return ((1 + columns % 2) * ((winningOffset - (columns % 2))) / (columns * 2))
        break;
      default:
        return 0;
        break;
    }
  }
  return (
    <>
      <div className="grid" style={{ "--rows": rows, "--columns": columns }}>
        {[...Array(rows).keys()].map((row) =>
          [...Array(columns).keys()].map((column) =>
            <Square
              key={`${row}-${column}`}
              text={`${row}-${column}`}
              getText={() => getText(row, column)}
              getClicked={() => getClicked(row, column)}
              onClick={() => setClicked(row, column)}
            />
          )
        )}
        <div className={`crossed ${winningDirection}`}
          style={{ "--translate": calcBarOffset()}}
        />
      </div>
    </>
  )
}

function Square(props) {
  return (
    <div
      className={`square ${props.getClicked() ? "clicked" : ""}`}
      onClick={props.onClick}
    >
      <p>{props.getText()}</p>
      <div className='id'>
        {props.text}
      </div>
    </div >
  )
}

export default App;
