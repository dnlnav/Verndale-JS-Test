'use strict';

import React, { Fragment } from 'react';
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
    <Fragment>
      <div className="input-group">
        <input className="input" type="text" onChange={handleInputChange} onKeyDown={handleKeypress} value={inputValue} />
        {inputValue && <span className="delete-button" onClick={deleteInput}>&times;</span> }
      </div>
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
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
