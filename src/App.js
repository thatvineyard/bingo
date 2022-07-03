import './App.css';
import Bingo from './Bingo/Bingo';
import { useEffect, useState } from 'react';
import React from 'react';
import BingoLineOverlay from './Bingo/BingoLineOverlay';
import CollapsableDrawer from './Drawer/CollapsableDrawer';
import IconList from './Common/IconList';

const boards = require('./board-config.json');


function App() {

  //  
  // userBoardConfig  
  // Looks at the query parameter `board` and base64 decodes
  // it and grabs the board config from the json file.
  const useBoardConfig = () => {
    const [boardId, setBoardId] = useState(null)

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      setBoardId(() => {
        try {
          return window.atob(params.get("board"))
        } catch (err) {
          return ""
        }
      });
    }, [])

    return boards[boardId] || boards.default;
  }
  const list = ["default", "demo", "board1", "board2"]

  const [searchString, setSearchString] = useState("");

  const searchedList = () => {
    if (searchString === "") {
      return list;
    }

    return list.filter(e => e.startsWith(searchString))
  }

  const handleChange = (event) => {
    setSearchString(event.target.value);
  }

  return (
    <div className="App">
      <nav>
        <CollapsableDrawer
          header="Select Board"
          headerHeight={30}
          width={300}
        >
          <p>Search: <input
            value={searchString}
            onChange={handleChange}
            placeholder="Write here to search..."
          />
          </p>
          <IconList
            items={
              searchedList().map((element) => (
                { icon: "board", text: element, link: `?board=${window.btoa(element)}` }
              ))
            }
            lineHeight={30}
            fontSize={20}
            iconGap={10}
            iconColor={"var(--col-fg-pri)"}
          />
        </CollapsableDrawer>
      </nav>
      <div id="title">
        <header>
          BINGO
        </header>
        <BingoLineOverlay
          completeLines={[{ direction: "row", index: 0 }]}
          color="217, 221, 228"
          opacity="1"
        />
      </div>
      <div id="content">
        <Bingo boardConfig={useBoardConfig()}
        />
      </div>
      <footer>
        <a href="https://www.flaticon.com/free-icons/menu" title="menu icons">Menu icons created by ariefstudio - Flaticon</a>
      </footer>
    </div>
  );
}

export default App;
