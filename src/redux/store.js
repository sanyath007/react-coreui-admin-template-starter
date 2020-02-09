import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './auth/reducer';
import patienReducer from './patients/reducer';
import visitionReducer from './visitions/reducer';
import registrationReducer from './registrations/reducer';
import changwatReducer from './changwat/reducer';
import amphurReducer from './amphur/reducer';
import tambonReducer from './tambon/reducer';
import icd10Reducer from './icd10/reducer';
import hospcodeReducer from './hospcode/reducer';
import barthelReducer from './barthel/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  patient: patienReducer,
  visition: visitionReducer,
  registration: registrationReducer,
  changwat: changwatReducer,
  amphur: amphurReducer,
  tambon: tambonReducer,
  icd10: icd10Reducer,
  hospcode: hospcodeReducer,
  barthel: barthelReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
