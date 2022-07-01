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

// const kort1 = [
//   [
//     "NÅGON FÖLL UNDER BORDET",
//     "NÅGON SÖP PÅ GRANNENS FISK",
//     "GUBBYOGA MED STRUMPOR OCH SANDALER",
//     "VÄSTGÖTAKLIMAX VID STH - ENTRÉN",
//   ], [
//     "HALVAN KOM FÖRE TERSEN MED EFTER HELAN",
//     "BR DUMANSKI SLOG BR WEIBORG PÅ KÄFTEN",
//     "DALA SPELADE INTE PÅ SIN JÄTTETRUMPET",
//     "KAPITELMEDALJEN BLEV OFFICIELL",
//   ], [
//     "BR WILHELMSSON SKREV NY MUSIK OCH TEXT",
//     "BÅDE STH OCH LCM BAR FEZ",
//     "FINNEN KENNETH KOM PÅ BESÖK",
//     "KORVEN BLEV OFRIVILLIGT GRATTIS",
//   ], [
//     "MANLIGT BEHÄRSKAD GLÄDJE FANNS",
//     "GOD MAT",
//     "BRÄNN BRON SA TERSEN ",
//     "BR KOUADRI BJÖD PÅ JÄTTEÄCKLIG SPRIT",
//   ],
// ]

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
        .
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
  const winningDirection = "column"
  const winningOffset = 1

  // Diag down (4, 4)        Diag up (4, 4)
  // [x] [ ] [ ] [ ]         [ ] [ ] [ ] [ ]
  // [ ] [ ] [ ] [ ]         [ ] [ ] [ ] [ ]
  // [ ] [ ] [ ] [ ]         [ ] [ ] [ ] [ ]
  // [ ] [ ] [ ] [ ]         [x] [ ] [ ] [ ]
  //
  // Diag down (5, 4)        Diag up (5, 4)
  // [x] [ ] [ ] [ ]         [ ] [ ] [ ] [ ]
  // [x] [ ] [ ] [ ]         [ ] [ ] [ ] [ ]
  // [ ] [ ] [ ] [ ]         [ ] [ ] [ ] [ ]
  // [ ] [ ] [ ] [ ]         [x] [ ] [ ] [ ]
  // [ ] [ ] [ ] [ ]         [x] [ ] [ ] [ ]
  // 
  // Diag down (4, 5)        Diag up (4, 5)
  // [x] [x] [ ] [ ] [ ]     [ ] [ ] [ ] [x] [x]
  // [ ] [ ] [ ] [ ] [ ]     [ ] [ ] [ ] [ ] [ ]
  // [ ] [ ] [ ] [ ] [ ]     [ ] [ ] [ ] [ ] [ ]
  // [ ] [ ] [ ] [ ] [ ]     [ ] [ ] [ ] [ ] [ ]
  // 
  // Number that fits in a column:
  //  - at least 1
  //  - for each extra row more than columns then it's an extra
  // 1 + max(0, 5-4)
  //

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
    let winCandidateColumns = Array(columns).fill(0);
    let winCandidateRows = Array(rows).fill(0);
    clickedSquares.map((coordinate) => {
      const [row, column] = coordinate;

      winCandidateColumns[column]++;
      winCandidateRows[row]++;

      // if (!winCandidatesRows.includes(row)) {
      //   setWinCandidatesRows((prevWinCandidateRows) => (prevWinCandidateRows.concat([row])))
      // }
      // if (!winCandidatesColumns.includes(column)) {
      //   setWinCandidatesColumns((prevWinCandidateColumns) => (prevWinCandidateColumns.concat([column])))
      // }
      // if (isOnDiagonalForward(row, column) && !winCandidatesDiagonalForward.includes(row)) {
      //   setWinCandidatesDiagonalForward((prevWinCandidateDiagonalForward) => (prevWinCandidateDiagonalForward.concat([row])))
      // }
      // if (isOnDiagonalBackward(row, column) && !winCandidatesDiagonalBackward.includes(row)) {
      //   setWinCandidatesDiagonalBackward((prevWinCandidateDiagonalBackward) => (prevWinCandidateDiagonalBackward.concat([row])))
      // }
    })
    console.log("winCandidateRows")
    console.log(winCandidateRows)
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
      return completeLines;
    })
  }

  const calcBarOffset = (winningDirection, winningOffset) => {
    switch (winningDirection) {
      case "row":
        return -(((rows-1)/2) - winningOffset) / rows
        break;
        case "column":
        return -(((columns-1)/2) - winningOffset) / columns
        break;
      default:
        return 0;
        break;
    }
  }
  return (
    <>
      <p>{`${rows - columns} ${columns - rows}`}</p>
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
              />
            )
          )}
        </div>
        <div className="overlay">
          {completeLines.map((element) => (
            <Bar winningDirection={element.direction} winningOffset={element.index} calcBarOffset={calcBarOffset} />
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
      {/* <p>{props.getText()}</p> */}
      <p>{`diagFowrd: ${props.isOnDiagonalForward() ? "✅" : "❌"}`}</p>
      <p>{`diagBack: ${props.isOnDiagonalBackward() ? "✅" : "❌"}`}</p>
      <p>{`row:${props.calcBarOffset("row", props.tmpRow)}`}</p>
      <p>{`column:${props.calcBarOffset("column", props.tmpColumn)}`}</p>
      <div className='id'>
        {props.idText}
      </div>
    </div >
  )
}


function Bar(props) {
  return (
    <div className={`crossed ${props.winningDirection}`}
      style={{ "--translate": props.calcBarOffset(props.winningDirection, props.winningOffset) }}
    />
  )
}

export default App;
