// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import signupStates from "./features/signupStates";
import profileFeature from "./features/profileFeatureSlice"
import counterReducer from "./features/counterSlice";

const rootReducer = combineReducers({
  signupState: signupStates,
  profileBoost: profileFeature,
  counter: counterReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});


export const persistor = persistStore(store);
