import './BingoLineOverlay.css'

function BingoLineOverlay(props) {
  const calcBarOffset = (dimension, winningDirection, winningOffset) => {
    switch (winningDirection) {
      case "row":
        if (dimension === "Y") {
          return -(((props.rows - 1) / 2) - winningOffset) / props.rows
        } else {
          return 0;
        }
      case "column":
        if (dimension === "X") {
          return -(((props.columns - 1) / 2) - winningOffset) / props.columns
        } else {
          return 0;
        }
      case "diagonalForward":
        if (props.rows > props.columns) {
          if (dimension === "Y") {
            return (winningOffset - 0.5) / props.rows
          } else {
            return 0;
          }
        } else if (props.columns > props.rows) {
          if (dimension === "X") {
            return -(winningOffset - 0.5) / props.columns
          } else {
            return 0;
          }
        } else {
          if (dimension === "X") {
            return -(winningOffset) / props.columns
          } else {
            return 0;
          }
        }
      case "diagonalBackward":
        if (props.rows > props.columns) {
          if (dimension === "Y") {
            return (winningOffset - 0.5) / props.rows
          } else {
            return 0;
          }
        } else if (props.columns > props.rows) {
          if (dimension === "X") {
            return -(winningOffset - 0.5) / props.columns
          } else {
            return 0;
          }
        } else {
          if (dimension === "X") {
            return (winningOffset) / props.columns
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
        if (props.rows > props.columns) {
          return `1, ${props.columns / props.rows}`
        } else {
          return `${props.rows / props.columns}, 1`
        }
      default:
        return "1";
    }
  }

  return (
    <div className="overlay">
      {props.completeLines.map((element) => (
        <Bar key={`${element.direction}${element.index}`} 
        winningDirection={element.direction} 
        winningOffset={element.index} 
        calcBarOffset={calcBarOffset} 
        calcBarScale={calcBarScale} />
      ))}
    </div>
  )
}

function Bar(props) {
  return (
    <div className={`line ${props.winningDirection}`}
      style={{
        "--translateX": props.calcBarOffset("X", props.winningDirection, props.winningOffset),
        "--translateY": props.calcBarOffset("Y", props.winningDirection, props.winningOffset),
        "--scale": props.calcBarScale(props.winningDirection)
      }}
    />
  )
}

export default BingoLineOverlay;