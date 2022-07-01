function Bar(props) {
  return (
    <div className={`line ${props.winningDirection}`}
      style={{
        "--translateX": props.calcBarOffset("X", props.winningDirection, props.winningOffset),
        "--translateY": props.calcBarOffset("Y", props.winningDirection, props.winningOffset),
        "--scale": props.calcBarScale(props.winningDirection),
        "--color": `${props.color || "0, 0, 0"}`
      }}
    />
  )
}

export default Bar;