'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { useListLogic } from './appContainer';
import '../sass/app.scss';



function App() {
  const {
    inputValue, itemList, highlightedItem,
    handleInputChange, handleKeypress, handleListItemHover,
    deleteInput, selectState
  } = useListLogic();

  return (
    <div>
      <input type="text" onChange={handleInputChange} onKeyDown={handleKeypress} value={inputValue} />
      <span onClick={deleteInput}>&times;</span>
      <ul className="list">
        {itemList.map((state, index) =>
          <li
            key={index}
            className={`list__item ${index === highlightedItem ? 'active' : ''}`}
            onMouseEnter={() => handleListItemHover(index)}
            onClick={() => selectState(index)}
          >
            {state}
          </li>
        )}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
