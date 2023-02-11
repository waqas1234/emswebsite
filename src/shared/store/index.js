import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/authentication/userSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { persistStore, persistReducer } from "redux-persist";

const REACT_APP_REDUX_PERSIST_SECRET_KEY =
  "h@{guzaR7'Iy2xLR`kJ1vY(7UVTx'g;D@17$Di>)UJ@;tgOVs_!91S:kJ5QA05I";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: REACT_APP_REDUX_PERSIST_SECRET_KEY,
      onError: function (error) {
        console.log("error", error);
      },
    }),
  ],
};

const rootReducer = combineReducers({
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
