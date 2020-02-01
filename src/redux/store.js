import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import patienReducer from './patients/reducer';
import changwatReducer from './changwat/reducer';
import amphurReducer from './amphur/reducer';
import tambonReducer from './tambon/reducer';

const rootReducer = combineReducers({
  patient: patienReducer,
  changwat: changwatReducer,
  amphur: amphurReducer,
  tambon: tambonReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
