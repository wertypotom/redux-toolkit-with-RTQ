import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from './reducers/UserSlice';

const roodReducer = combineReducers({
  UserReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: roodReducer,
  });
};

export type RootState = ReturnType<typeof roodReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
