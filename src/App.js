import './App.css';
import GameSquare from './GameSquare';
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
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setBoard(() => {
      try {
        return window.atob(params.get("board"))
      } catch (err) {
        return ""
      }
    });
  }, [])

  const getBoard = (() => {
    return boards[board] || boards.default;
  })

  return (
    <div className="App">
      <header className="App-header">
        JINGO
      </header>
      <Grid card={getBoard()} />
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
  const getText = (row, column) => (props.card[row][column] || "Free Space")
  const [clickedSquares, setClickedSquares] = useState([])
  const [completeLines, setCompleteLines] = useState([]);
  const getClicked = (row, column) => (clickedSquares.find(e => e[0] === row && e[1] === column) ? true : false)
  const setClicked = (row, column) => {
    setClickedSquares((prevClickedSquares) => {
      if (getClicked(row, column)) {
        return prevClickedSquares.filter(e => (e[0] === row && e[1] === column) ? false : true)
      } else {
        return prevClickedSquares.concat([[row, column]])
      }
    })
  }

  const isOnDiagonalForward = useCallback((row, column) => {
    const coordinateCalc = row - (columns - column - 1);
    const gridCalc = rows - columns;

    if (rows === columns) {
      return coordinateCalc === 0;
    } else if (rows > columns) {
      return (coordinateCalc >= 0) && (coordinateCalc <= gridCalc)
    } else {
      return (coordinateCalc <= 0) && (coordinateCalc >= gridCalc)
    }
  },[rows, columns])

  const isOnDiagonalBackward = useCallback((row, column) => {
    const coordinateCalc = row - column;
    const gridCalc = rows - columns;

    if (rows === columns) {
      return coordinateCalc === 0;
    } else if (rows > columns) {
      return (coordinateCalc >= 0) && (coordinateCalc <= gridCalc)
    } else {
      return (coordinateCalc <= 0) && (coordinateCalc >= gridCalc)
    }
  },[rows, columns])


  const calcWin = useCallback(() => {
    const numOfDiagonals = Math.abs(rows - columns) + 1;
    const diagonalLength = Math.min(columns, rows);
    let winCandidateColumns = Array(columns).fill(0);
    let winCandidateRows = Array(rows).fill(0);
    let winCandidatesDiagonalBackward = Array(numOfDiagonals).fill(0);
    let winCandidatesDiagonalForward = Array(numOfDiagonals).fill(0);
    clickedSquares.forEach((coordinate) => {
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
      winCandidateColumns.forEach((element, index) => {
        if (element === rows) {
          completeLines.push({ direction: "column", index: index })
        }
      })
      winCandidateRows.forEach((element, index) => {
        if (element === columns) {
          completeLines.push({ direction: "row", index: index })
        }
      })
      winCandidatesDiagonalForward.forEach((element, index) => {
        if (element === diagonalLength) {
          completeLines.push({ direction: "diagonalForward", index: index })
        }
      })
      winCandidatesDiagonalBackward.forEach((element, index) => {
        if (element === diagonalLength) {
          completeLines.push({ direction: "diagonalBackward", index: index })
        }
      })
      return completeLines;
    })
  },[rows, columns, clickedSquares, isOnDiagonalBackward, isOnDiagonalForward])


  useEffect(() => {
    calcWin();
  }, [calcWin])

  
  const isCandidate = (row, column) => {
    return isOnDiagonalForward(row, column)
  }


  const calcBarOffset = (dimension, winningDirection, winningOffset) => {
    switch (winningDirection) {
      case "row":
        if (dimension === "Y") {
          return -(((rows - 1) / 2) - winningOffset) / rows
        } else {
          return 0;
        }
      case "column":
        if (dimension === "X") {
          return -(((columns - 1) / 2) - winningOffset) / columns
        } else {
          return 0;
        }
      case "diagonalForward":
        if (rows > columns) {
          if (dimension === "Y") {
            return (winningOffset - 0.5) / rows
          } else {
            return 0;
          }
        } else if (columns > rows) {
          if (dimension === "X") {
            return -(winningOffset - 0.5) / columns
          } else {
            return 0;
          }
        } else {
          if (dimension === "X") {
            return -(winningOffset) / columns
          } else {
            return 0;
          }
        }
      case "diagonalBackward":
        if (rows > columns) {
          if (dimension === "Y") {
            return (winningOffset - 0.5) / rows
          } else {
            return 0;
          }
        } else if (columns > rows) {
          if (dimension === "X") {
            return -(winningOffset - 0.5) / columns
          } else {
            return 0;
          }
        } else {
          if (dimension === "X") {
            return (winningOffset) / columns
          } else {
            return 0;
          }
        }
      default:
        return 0;
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
      default:
        return "1";
    }

  }
  return (
    <>
      <div className="gameArea">
        <div className="grid" style={{ "--rows": rows, "--columns": columns }}>
          {[...Array(rows).keys()].map((row) =>
            [...Array(columns).keys()].map((column) =>
              <GameSquare
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
