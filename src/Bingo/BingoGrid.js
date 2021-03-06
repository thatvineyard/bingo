import BingoSquare from './BingoSquare';
import './BingoGrid.css'

function BingoGrid(props) {
  return (
    <div className="bingoGrid" style={{ "--rows": props.rows, "--columns": props.columns }}>
      {[...Array(props.rows).keys()].map((row) =>
        [...Array(props.columns).keys()].map((column) =>
          <BingoSquare
            key={`${row}-${column}`}
            idText={`${row}-${column}`}
            getText={() => props.getText(row, column)}
            getClicked={() => props.getClicked(row, column)}
            onClick={() => props.setClicked(row, column)}
            isOnDiagonalForward={() => props.isOnDiagonalForward(row, column)}
            isOnDiagonalBackward={() => props.isOnDiagonalBackward(row, column)}
          />
        )
      )}
    </div>
  )
}

export default BingoGrid;