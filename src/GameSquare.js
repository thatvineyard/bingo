
import './GameSquare.css'

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

export default GameSquare;