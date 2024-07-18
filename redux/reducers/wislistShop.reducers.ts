import { IProduct, IShop } from "@/types";
import { createSlice } from "@reduxjs/toolkit";


interface IinitialState {
    wishlistShop: IShop[]
}

const initialState: IinitialState = {
    wishlistShop: []
}

const WishlistShopSlice = createSlice({
    name: "wishlistShop",
    initialState,
    reducers: {
        // adding product to wislist 
        addShopToWishlistShop: (state, action) => {
            const isAlreadyExists = state.wishlistShop.findIndex(p => p._id.toString() === action.payload._id.toString());
            if (isAlreadyExists !== -1) {
                state.wishlistShop.splice(isAlreadyExists, 1);
                console.log("shop already exists, removing it.")
            }
            const newProduct = action.payload
            state.wishlistShop.push(newProduct);
            console.log("shop added to wishlistShop.")
        },

        // removing product from wishlistShop 
        removeShopToWishlistShop: (state, action) => {
            const isAlreadyExists = state.wishlistShop.findIndex(p => p._id.toString() === action.payload._id.toString());
            if (isAlreadyExists !== -1) {
                state.wishlistShop.splice(isAlreadyExists, 1);
                console.log("shop removed from wishlistShop successfully.")
            }
        }
    }
})



export const { addShopToWishlistShop, removeShopToWishlistShop } = WishlistShopSlice.actions;

export default WishlistShopSlice.reducer