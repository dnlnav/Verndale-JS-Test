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

  const handleKeypress = event => {
    const key = event.keyCode;
    const keyEvents = {
      13: selectState,
      38: highlightItemAbove,
      40: highlightItemBelow,
    };
    keyEvents[key] && keyEvents[key]();
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
    itemSelected && setItemSelected(false);
  };

  const highlightItemAbove = () => {
    setHighlightedItem(Math.max(highlightedItem - 1, -1))
  };

  const highlightItemBelow = () => {
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

  const handleListItemHover = index => setHighlightedItem(index);

  return {
    highlightedItem,
    handleInputChange,
    handleKeypress,
    handleListItemHover,
    selectState,
    itemList: list,
    inputValue: getInputValue(),
    deleteInput: () => setInputValue([]),
  };
}