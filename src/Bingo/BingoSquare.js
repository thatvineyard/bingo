
import './BingoSquare.css'

const defaultProps = {
  getClicked: () => (false),
  getText: () => (""),
}
function GameSquare(props) {
  return (
    <div
      className={`gameSquare ${props.getClicked() ? "clicked" : ""}`}
      onClick={props.onClick}
    >
      <p>{props.getText()}</p>
      <div className='id'>
        {props.idText}
      </div>
    </div >
  )
}

GameSquare.defaultProps = defaultProps;
export default GameSquare;