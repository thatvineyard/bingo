import './CollapsableDrawer.css';
import { useState } from 'react';
import Icon from '../Common/Icon';

const defaultProps = {
  headerHeight: 50,
  width: 300
}
const CollapsableDrawer = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prevOpen) => {
      return !prevOpen;
    })
  }

  return (
    <>
      <div className="drawer"
        style={{
          width: `${props.width}px`,
          pointerEvents: "none"
        }}
      >
        <div className='content static'
          style={{
            zIndex: 11,
            pointerEvents: "none"
          }}
        >
          <div className='header'
            style={{
              height: `${props.headerHeight}px`,
              width: `${props.headerHeight}px`,
              pointerEvents: "all"
            }}
          >
            <Icon
              size={props.headerHeight}
              type={"menu"}
              color={"var(--col-fg-pri)"}
              hidden={isOpen}
              style={{
                position: "absolute"
              }}
              onClick={toggleOpen}
            />
            <Icon
              size={props.headerHeight}
              type={"close"}
              color={"var(--col-fg-pri)"}
              hidden={!isOpen}
              style={{
                position: "absolute"
              }}
              onClick={toggleOpen}
            />
          </div>
        </div>
        <div className='content collapsable'
          style={{ 
            "--hide": isOpen ? "0%" : "100%",
            "--visibility": isOpen ? "100%" : "0%",
            pointerEvents: isOpen ? "all" : "none"
         }}
        >
          <div className='header'
            style={{
              height: `${props.headerHeight}px`,
              marginLeft: `${props.headerHeight}px`,
              width: `calc(100% - ${props.headerHeight + 20}px)`,
              display: "flex",
              alignItems: "center"
            }}
          >
            <h1>Select board</h1>
          </div>
          {props.children}
        </div>
      </div>
    </>
  )
}
CollapsableDrawer.defaultProps = defaultProps;

export default CollapsableDrawer;