import Immutable from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const RANGE_SET = 'RANGE_SET';
export const RANGE_DELETE = 'RANGE_DELETE';

// ------------------------------------
// Actions
// ------------------------------------

export function setRange (id, range) {
  return {
    type: RANGE_SET,
    payload: {
      id,
      range
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
  setRange,
  deleteRange
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RANGE_SET]: (state, action) => state.set(action.payload.id, action.payload.range),
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
