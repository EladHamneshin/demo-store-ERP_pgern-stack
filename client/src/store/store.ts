import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './emailSlice';
import tagSlice from './tagSlice';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    tags: tagSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
