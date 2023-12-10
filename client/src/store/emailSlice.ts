import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    category: '',
    forSale: true
};

export const emailSlice = createSlice({
    name: 'userEmail',
    initialState,
    reducers: {
        saveEmail: (state, action: PayloadAction<string>) => {
          state.email = action.payload;          
        },
        saveCategory: (state, action: PayloadAction<string>) => {
          state.category = action.payload;          
        },
        changeForSale: (state, action: PayloadAction<boolean>) => {
          state.forSale = action.payload;       
        }

    }
});

export const { saveEmail, saveCategory, changeForSale } = emailSlice.actions;
export default emailSlice.reducer
