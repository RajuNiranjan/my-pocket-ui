import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Actions/user";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";

const rootReducer = combineReducers({ user: userReducer });

const persitConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persitConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
