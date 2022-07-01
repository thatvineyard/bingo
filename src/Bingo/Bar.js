function Bar(props) {
  return (
    <div className={`line ${props.winningDirection}`}
      style={{
        "--translateX": props.calcBarOffset("X", props.winningDirection, props.winningOffset),
        "--translateY": props.calcBarOffset("Y", props.winningDirection, props.winningOffset),
        "--scale": props.calcBarScale(props.winningDirection),
        "--color=1": `${props.color}-1`,
        "--color=2": `${props.color}-1`,
      }}
    />
  )
}

export default Bar;