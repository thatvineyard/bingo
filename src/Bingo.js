import BingoLineOverlay from './BingoLineOverlay';
import BingoGrid from './BingoGrid';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';

// Static functions
function calcDimensions(card) {
  let rows = card.length;
  let columns = card.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.length),
    0
  );
  return [rows, columns];
}

function Bingo(props) {

  
  const getText = (row, column) => (props.card[row][column] || "Free Space")
  
  const [rows, columns] = calcDimensions(props.card)



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

  // RETURN
  return (
    <div className="gameArea">
    <BingoGrid 
      rows={rows} 
      columns={columns}
      getText={getText}
      getClicked={getClicked}
      setClicked={setClicked}
      isOnDiagonalBackward={isOnDiagonalBackward}
      isOnDiagonalForward={isOnDiagonalForward}
    />
    <BingoLineOverlay 
      completeLines={completeLines}
      columns={columns}
      rows={rows}
    />
  </div>
  )
}

export default Bingo;