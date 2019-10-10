import { mapResponseToStateList } from './stateAPIMapper';

const URL = '/api/states?term=';

export async function fetchStates(stateInput = '', setStateList){
  const response = await fetch(URL + stateInput);
  const json = await response.json();
  const stateList = mapResponseToStateList(json.data);
  setStateList(stateList);
}