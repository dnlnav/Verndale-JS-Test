import React, { useState, useEffect } from 'react';
import { fetchStates } from './stateAPI';

export function useListLogic() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [itemSelected, setItemSelected] = useState(false)
  const [highlightedItem, setHighlightedItem] = useState(-1)

  useEffect(() => {
    if (inputValue.length > 1 && !itemSelected) {
      fetchStates(inputValue, list => setList(list));
    } else {
      setList([]);
    }
  }, [inputValue])


  const handleInputChange = event => {
    setInputValue(event.target.value);
    itemSelected && setItemSelected(false);
  };

  const highlightItemAbove = event => {
    event.preventDefault();
    setHighlightedItem(Math.max(highlightedItem - 1, -1))
  };

  const highlightItemBelow = event => {
    event.preventDefault();
    setHighlightedItem(Math.min(highlightedItem + 1, list.length - 1))
  };

  const selectState = (index = highlightedItem) => {
    if (index > -1) {
      setInputValue(list[index]);
      setList([]);
      setHighlightedItem(-1);
      setItemSelected(true);
    }
  };

  const getInputValue = () => highlightedItem > -1 ? list[highlightedItem] : inputValue;

  const deleteCharacter = () => {
    const value = getInputValue();
    setInputValue(getInputValue());
    setHighlightedItem(-1);
  }

  const handleKeypress = event => {
    const key = event.keyCode;
    const keyEvents = {
      13: () => selectState(),
      38: highlightItemAbove,
      40: highlightItemBelow,
      8: deleteCharacter,
    };
    keyEvents[key] && keyEvents[key](event);
  };
  const handleListItemHover = index => setHighlightedItem(index);

  const deleteInput = () => {
    setInputValue("");
    setHighlightedItem(-1);
  };

  return {
    highlightedItem,
    handleInputChange,
    handleKeypress,
    handleListItemHover,
    selectState,
    itemList: list,
    inputValue: getInputValue(),
    deleteInput,
  };
}