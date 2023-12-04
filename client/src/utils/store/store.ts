import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './emailSlice';

export const store = configureStore({
  reducer: {
    email: emailReducer // change later
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
