import './App.css';
import Bingo from './Bingo/Bingo';
import { useEffect, useState } from 'react';
import React from 'react';
import BingoLineOverlay from './Bingo/BingoLineOverlay';
import CollapsableDrawer from './Drawer/CollapsableDrawer';
import IconList from './Common/IconList';

const boards = require('./board-config.json');


function App() {
  // useBoardConfig  
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

    let board = boards.find(element => element.id === boardId) || boards.find(element => element.id === "0");
    return board;
    // return boards[boardId] || boards.default;
  }

  const useBoardList = () => {
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
      setBoardList(() => {
        return boards.map(element => {
          let result = {...element}
          delete result.element
          return result;
        })
      })
    }, [])

    return boardList;
  }

  const list = ["default", "demo", "board1", "board2"];
  const boardList = useBoardList();


  const [searchString, setSearchString] = useState("");

  const searchedList = () => {
    if (searchString === "") {
      return boardList;
    }

    return boardList.filter(e => e.name.includes(searchString))
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
          width={250}
        >
          <p>Search: <input
            value={searchString}
            onChange={handleChange}
            placeholder="Write here to search..."
          />
          </p>
          <IconList
            items={
              searchedList().map((board) => (
                { icon: "board", text: board.name, subText: board.tags.join(", "), link: `?board=${window.btoa(board.id)}` }
              ))
            }
            lineHeight={40}
            fontSize={15}
            iconGap={0}
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
