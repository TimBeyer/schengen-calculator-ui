import Immutable from 'immutable';
const moment = require('moment');

// ------------------------------------
// Constants
// ------------------------------------
export const RANGE_DELETE = 'RANGE_DELETE';
export const RANGE_ADD = 'RANGE_ADD';

export const CALENDAR_SHOW = 'CALENDAR_SHOW';
export const CALENDAR_HIDE = 'CALENDAR_HIDE';

export const MODE_EDIT = 'MODE_EDIT';
export const MODE_OVERVIEW = 'MODE_OVERVIEW';

export const REFERENCE_POINT_SET = 'REFERENCE_POINT_SET';

// ------------------------------------
// Actions
// ------------------------------------

export function setReferencePoint (value) {
  return {
    type: REFERENCE_POINT_SET,
    payload: {
      value
    }
  };
}

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

export function editMode (id) {
  return {
    type: MODE_EDIT,
    payload: {
      id
    }
  };
}

export function overviewMode (id) {
  return {
    type: MODE_OVERVIEW,
    payload: {}
  };
}

export const actions = {
  showCalendar,
  hideCalendar,
  setReferencePoint,
  editMode,
  overviewMode
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RANGE_ADD]: (state, action) => {
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
  [RANGE_DELETE]: (state, action) => state.deleteIn(['ranges', action.payload.id]),
  [REFERENCE_POINT_SET]: (state, action) => state.setIn(['referencePoint'], action.payload.value),
  [MODE_EDIT]: (state, action) => state.setIn(['mode'], MODE_EDIT).setIn(['editId'], action.payload.id),
  [MODE_OVERVIEW]: (state, action) => state.setIn(['mode'], MODE_OVERVIEW).deleteIn(['editId'])
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.Map({
  referencePoint: moment(),
  mode: MODE_OVERVIEW
});
export default function dateReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
