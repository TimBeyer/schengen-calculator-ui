import { combineReducers } from 'redux-immutable';
import ranges from './modules/ranges';
import uiState from './modules/uiState';

export default combineReducers({
  ranges,
  uiState
});
