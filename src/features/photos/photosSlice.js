import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  albums: [],
  comments: [],
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    addAlbums(state, { payload }) {
      return { ...state, albums: payload };
    },
    addComments(state, { payload }) {
      return { ...state, comments: payload };
    },
    addComment(state, { payload }) {
      return { ...state, comments: state.comments.concat(payload) };
    },
  },
});

export const { addAlbums, addComments, addComment } = photosSlice.actions;
export default photosSlice.reducer;
