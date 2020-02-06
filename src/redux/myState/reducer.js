import {
  // my action types...
} from './type';

const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case [MY_ACTIONS_TYPE]:
      return {
        ...state,
        // another state
      };
    default: return state;
  }
}
