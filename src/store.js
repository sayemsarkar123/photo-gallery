import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import photosSlice from './features/photos/photosSlice';

export default configureStore({
  reducer: photosSlice,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
