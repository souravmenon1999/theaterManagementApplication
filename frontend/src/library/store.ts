import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import theaterSlice from './features/dashBoard/dashBoardSlice'
import screenSlice from './features/dashBoard/screenSlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
      users: userSlice,
      theaterDetails: theaterSlice,
      screenDetails: screenSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
