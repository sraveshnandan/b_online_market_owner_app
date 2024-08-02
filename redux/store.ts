import { configureStore, combineReducers } from "@reduxjs/toolkit"
import mainReducers from "./reducers/main.reducers"
import authReducer from "./reducers/auth.reducer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persistReducer, persistStore } from "redux-persist"

const Reducers = combineReducers({
    main: mainReducers,
    auth: authReducer,

})

const PersistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["main", "auth"]
}

const persistedReducers = persistReducer(PersistConfig, Reducers)

const isDevelopment = process.env.NODE_ENV === 'development';

const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: isDevelopment ? { warnAfter: 994 } : false,
        });
        return middlewares;
    },
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export { store, persistor }