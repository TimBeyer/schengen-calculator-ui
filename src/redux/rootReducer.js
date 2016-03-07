import { combineReducers } from 'redux-immutable';
import ranges from './modules/ranges';
import uiState from './modules/uiState';
import undoable, { distinctState } from 'redux-undo'

const combined = combineReducers({
  ranges,
  uiState
});

const undoableStates = undoable(combined, {
  filter: distinctState()
});

export default undoableStates;
