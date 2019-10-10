'use strict';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { fetchStates } from './stateAPI';
import appStyles from '../sass/app.scss';


function App() {
  const [inputState, setInputState] = useState("");
  const [stateList, setStateList] = useState([]);
  const [stateSelected, setStateSelected] = useState(false)
  const [highlightedState, setHighlightedState] = useState(-1)

  useEffect(() => {
    if (inputState.length > 1 && !stateSelected) {
      fetchStates(inputState, list => setStateList(list));
    } else {
      setStateList([]);
    }
  }, [inputState])

  const highlightStateAbove = () => {
    setHighlightedState(Math.max(highlightedState - 1, -1))
  };

  const highlightStateBelow = () => {
    setHighlightedState(Math.min(highlightedState + 1, stateList.length - 1))
  };

  const selectState = () => {
    if (highlightedState > -1){
      setInputState(stateList[highlightedState]);
      setStateList([]);
      setHighlightedState(-1);
      setStateSelected(true);
    }
  };

  const handleKeypress = event => {
    const key = event.keyCode;
    const keyEvents = {
      13: selectState,
      38: highlightStateAbove,
      40: highlightStateBelow,
    };
    keyEvents[key] && keyEvents[key]();
  };

  const handleInputChange = event => {
    setInputState(event.target.value);
    stateSelected && setStateSelected(false);
  };

  const getInputValue = () => highlightedState > -1 ? stateList[highlightedState] : inputState;

  return (
    <div>
      <input type="text"
        onChange={handleInputChange}
        onKeyDown={handleKeypress}
        value={getInputValue()}/>
      <ul className="list">
        {stateList.map((state, index) =>
          <li key={index} className={`list__item ${index === highlightedState ? 'active' : ''}`}>
            {state}
          </li>
        )}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
