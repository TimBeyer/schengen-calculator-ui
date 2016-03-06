import Immutable from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const RANGE_DELETE = 'RANGE_DELETE';
export const RANGE_ADD = 'RANGE_ADD';

export const CALENDAR_SHOW = 'CALENDAR_SHOW';
export const CALENDAR_HIDE = 'CALENDAR_HIDE';



// ------------------------------------
// Actions
// ------------------------------------

export function showCalendar (id) {
  return {
    type: CALENDAR_SHOW,
    payload: {
      id
    }
  };
}

export function hideCalendar (id) {
  return {
    type: CALENDAR_HIDE,
    payload: {
      id
    }
  };
}

export const actions = {
  showCalendar,
  hideCalendar
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RANGE_ADD]: (state, action) => {
    console.log('Add Range')
    return state.setIn(['ranges', action.payload.id], Immutable.Map({
      showCalendar: true
    }));
  },
  [CALENDAR_SHOW]: (state, action) => {
    return state.setIn(['ranges', action.payload.id, 'showCalendar'], true);
  },
  [CALENDAR_HIDE]: (state, action) => {
    return state.setIn(['ranges', action.payload.id, 'showCalendar'], false);
  },
  [RANGE_DELETE]: (state, action) => state.deleteIn(['ranges', action.payload.id])
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.Map({});
export default function dateReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
