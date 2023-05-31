import { configureStore, combineReducers,  } from "@reduxjs/toolkit";
import userId from "./user/userId";
import userChat from "./user/userChat";
const user = combineReducers({userId, userChat});

export const store = configureStore({
  reducer: user,
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>