import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    email: ''
};

export const emailSlice = createSlice({
    name: 'userEmail',
    initialState,
    reducers: {
        saveEmail: (state, action: PayloadAction<string>) => {
          state.email = action.payload;          
        }
    }
});

export const { saveEmail } = emailSlice.actions;
export default emailSlice.reducer
