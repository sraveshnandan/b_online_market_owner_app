import { configureStore, combineReducers } from "@reduxjs/toolkit"
import mainReducers from "./reducers/main.reducers"
import authReducer from "./reducers/auth.reducer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persistReducer, persistStore } from "redux-persist"
import cartReducers from "./reducers/cart.reducers"
import wishlistReducers from "./reducers/wishlist.reducers"
import wislistShopReducers from "./reducers/wislistShop.reducers"




const Reducers = combineReducers({
    main: mainReducers,
    auth: authReducer,
    cart: cartReducers,
    wishlist: wishlistReducers,
    wishlistShop: wislistShopReducers
})

const PersistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["main", "auth", "cart", "wishlist", "wishlistShop"]
}

const persistedReducers = persistReducer(PersistConfig, Reducers)



const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, })
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export { store, persistor }