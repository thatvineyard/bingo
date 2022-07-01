import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
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
  const [completeLines, setCompleteLines] = useState([]);
  const getClicked = (row, column) => (clickedSquares.find(e => e[0] == row && e[1] == column) ? true : false)
  const setClicked = (row, column) => {
    setClickedSquares((prevClickedSquares) => {
      if (getClicked(row, column)) {
        return prevClickedSquares.filter(e => (e[0] == row && e[1] == column) ? false : true)
      } else {
        return prevClickedSquares.concat([[row, column]])
      }
    })
  }
  useEffect(() => {
    calcWin();
  }, [clickedSquares])
  useEffect(() => {
    console.log("completeLines")
    console.log(completeLines)
  }, [completeLines])

  const isOnDiagonalForward = (row, column) => {
    const coordinateCalc = row - (columns - column - 1);
    const gridCalc = rows - columns;

    if (rows == columns) {
      return coordinateCalc == 0;
    } else if (rows > columns) {
      return (coordinateCalc >= 0) && (coordinateCalc <= gridCalc)
    } else {
      return (coordinateCalc <= 0) && (coordinateCalc >= gridCalc)
    }
  }

  const isOnDiagonalBackward = (row, column) => {
    const coordinateCalc = row - column;
    const gridCalc = rows - columns;

    if (rows == columns) {
      return coordinateCalc == 0;
    } else if (rows > columns) {
      return (coordinateCalc >= 0) && (coordinateCalc <= gridCalc)
    } else {
      return (coordinateCalc <= 0) && (coordinateCalc >= gridCalc)
    }
  }

  const isCandidate = (row, column) => {
    return isOnDiagonalForward(row, column)
  }

  const calcWin = () => {
    const numOfDiagonals = Math.abs(rows - columns) + 1;
    const diagonalLength = Math.min(columns, rows);
    let winCandidateColumns = Array(columns).fill(0);
    let winCandidateRows = Array(rows).fill(0);
    let winCandidatesDiagonalBackward = Array(numOfDiagonals).fill(0);
    let winCandidatesDiagonalForward = Array(numOfDiagonals).fill(0);
    clickedSquares.map((coordinate) => {
      const [row, column] = coordinate;

      winCandidateColumns[column]++;
      winCandidateRows[row]++;
      if (isOnDiagonalForward(row, column)) {
        if (rows >= columns) {
          winCandidatesDiagonalForward[row - (columns - column - 1)]++;
        } else {
          winCandidatesDiagonalForward[(columns - column - 1) - row]++;
        }
      }
      if (isOnDiagonalBackward(row, column)) {
        if (rows >= columns) {
          winCandidatesDiagonalBackward[row - column]++;
        } else {
          winCandidatesDiagonalBackward[column - row]++;
        }
      }
    })
    setCompleteLines(() => {
      let completeLines = []
      winCandidateColumns.map((element, index) => {
        if (element == rows) {
          completeLines.push({ direction: "column", index: index })
        }
      })
      winCandidateRows.map((element, index) => {
        if (element == columns) {
          completeLines.push({ direction: "row", index: index })
        }
      })
      winCandidatesDiagonalForward.map((element, index) => {
        if (element == diagonalLength) {
          completeLines.push({ direction: "diagonalForward", index: index })
        }
      })
      winCandidatesDiagonalBackward.map((element, index) => {
        if (element == diagonalLength) {
          completeLines.push({ direction: "diagonalBackward", index: index })
        }
      })
      return completeLines;
    })
  }

  const calcBarOffset = (dimension, winningDirection, winningOffset) => {
    const numOfDiagonals = Math.abs(rows - columns) + 1;
    switch (winningDirection) {
      case "row":
        if (dimension == "Y") {
          return -(((rows - 1) / 2) - winningOffset) / rows
        } else {
          return 0;
        }
        break;
      case "column":
        if (dimension == "X") {
          return -(((columns - 1) / 2) - winningOffset) / columns
        } else {
          return 0;
        }
        break;
      case "diagonalForward":
        if (rows > columns) {
          if (dimension == "Y") {
            return (winningOffset - 0.5) / rows
          } else {
            return 0;
          }
        } else {
          if (dimension == "X") {
            return -(winningOffset - 0.5) / columns
          } else {
            return 0;
          }
        }
        break;
      case "diagonalBackward":
        if (rows > columns) {
          if (dimension == "Y") {
            return (winningOffset - 0.5) / rows
          } else {
            return 0;
          }
        } else {
          if (dimension == "X") {
            return (winningOffset - 0.5) / columns
          } else {
            return 0;
          }
        }
        break;
      default:
        return 0;
        break;
    }
  }
  const calcBarScale = (winningDirection) => {
    switch (winningDirection) {
      case "diagonalForward":
      case "diagonalBackward":
        if (rows > columns) {
          return `1, ${columns / rows}`
        } else {
          return `${rows / columns}, 1`
        }
        break;
        deafult:
        return "1";
        break;
    }

  }
  return (
    <>
      <div className="gameArea">
        <div className="grid" style={{ "--rows": rows, "--columns": columns }}>
          {[...Array(rows).keys()].map((row) =>
            [...Array(columns).keys()].map((column) =>
              <Square
                key={`${row}-${column}`}
                idText={`${row}-${column}`}
                getText={() => getText(row, column)}
                getClicked={() => getClicked(row, column)}
                onClick={() => setClicked(row, column)}
                tmpRow={row}
                tmpColumn={column}
                tmpRows={rows}
                tmpColumns={columns}
                isOnDiagonalForward={() => isOnDiagonalForward(row, column)}
                isOnDiagonalBackward={() => isOnDiagonalBackward(row, column)}
                isCandidate={() => isCandidate(row, column)}
                calcBarOffset={calcBarOffset}
                calcBarScale={calcBarScale}
              />
            )
          )}
        </div>
        <div className="overlay">
          {completeLines.map((element) => (
            <Bar key={`${element.direction}${element.index}`} winningDirection={element.direction} winningOffset={element.index} calcBarOffset={calcBarOffset} calcBarScale={calcBarScale} />
          ))}
        </div>
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
        {props.idText}
      </div>
    </div >
  )
}


function Bar(props) {
  return (
    <div className={`crossed ${props.winningDirection}`}
      style={{
        "--translateX": props.calcBarOffset("X", props.winningDirection, props.winningOffset),
        "--translateY": props.calcBarOffset("Y", props.winningDirection, props.winningOffset),
        "--scale": props.calcBarScale(props.winningDirection)
      }}
    />
  )
}

export default App;
