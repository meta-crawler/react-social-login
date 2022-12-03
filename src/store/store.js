import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth';

import { combineReducers } from "redux";

const reducer = combineReducers({
  // here we will be adding reducers
  auth: authReducer,
});

const store =  configureStore({
  reducer,
});

export default store;


