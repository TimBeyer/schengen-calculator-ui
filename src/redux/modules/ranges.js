import Immutable from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const VALUE_SET = 'VALUE_SET';
export const RANGE_DELETE = 'RANGE_DELETE';
export const RANGE_ADD = 'RANGE_ADD';

// ------------------------------------
// Actions
// ------------------------------------

export function setValue (id, value) {
  return {
    type: VALUE_SET,
    payload: {
      id,
      value
    }
  };
}

export function addRange (id) {
  return {
    type: RANGE_ADD,
    payload: {
      id
    }
  };
}

export function deleteRange (id) {
  return {
    type: RANGE_DELETE,
    payload: {
      id
    }
  };
}

export const actions = {
  setValue,
  addRange,
  deleteRange
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RANGE_ADD]: (state, action) => state.set(action.payload.id, null),
  [VALUE_SET]: (state, action) => {
    return state.set(action.payload.id, action.payload.value);
    // const newRange = range.set('value', action.payload.value);
    // return state.set(action.payload.id, newRange);
  },
  [RANGE_DELETE]: (state, action) => state.delete(action.payload.id)
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.Map();
export default function dateReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
