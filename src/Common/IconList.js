import Icon from "./Icon";

function IconList(props) {
  return (
    <ul class="iconList"
      style={{
        paddingLeft: "0px",
        listStyle: "none",
        fontSize: `${props.fontSize}px`
      }}
    >
      {props.items.map((element) =>
        <li
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: `${props.lineHeight}px`,
            margin: "10px"
          }}
        >
          <Icon 
            type={element.icon}
            size={props.lineHeight}
            color={props.iconColor}
            style={{
              marginRight: `${props.iconGap}px`
            }}
            link={element.link}
          />
          {element.link ? <a href={element.link}>{element.text}</a> : <>{element.text}</>}
        </li>
      )}
    </ul>
  )
}

export default IconList;