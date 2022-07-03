import './Icon.css';

import menuIcon from "./assets/icons/menu_black_24dp.svg";
import closeIcon from "./assets/icons/close_black_24dp.svg";
import missingIcon from "./assets/icons/pending_black_24dp.svg";
import boardIcon from "./assets/icons/apps_black_24dp.svg";

const iconMap = {
  menu: menuIcon,
  close: closeIcon,
  missing: missingIcon,
  board: boardIcon
}

const Icon = (props) => {
  return (
    <div class={`icon`}
      alt="menu button"
      style={{
        ...props.style,
        "--color": props.color || "black",
        maskImage: `url(${iconMap[props.type] || iconMap.missing})`,
        width: props.size || 50,
        height: props.size || 50,
        cursor: props.onClick ? "pointer" : "inherit",
      }}
      className={`icon ${props.hidden ? "fadeOut" : "fadeIn"}`}
      onClick={props.onClick}
    >
      <a href={props.link}
        style={{
          width: props.size || 50,
          height: props.size || 50,
          fontSize: 0,
          display: "block"
        }}
      >Click</a>
    </div>
  )
}

export default Icon;