import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Tags } from '../types/Product';


interface TagsState {
  tags: Tags | null
}

const initialState: TagsState = {
    tags: null
};

export const tagSlice = createSlice({
    name: 'productTags',
    initialState,
    reducers: {
      saveTags: (state, action: PayloadAction<Tags>) => {
        state.tags = action.payload
      }
    }
});

export const { saveTags } = tagSlice.actions;
export default tagSlice.reducer
