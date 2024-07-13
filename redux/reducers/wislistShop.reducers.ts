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
        addProductToWishlistShop: (state, action) => {
            const isAlreadyExists = state.wishlistShop.findIndex(p => p._id.toString() === action.payload._id.toString());
            if (isAlreadyExists !== -1) {
                state.wishlistShop.splice(isAlreadyExists, 1);
                console.log("product already exists, removing it.")
            }
            const newProduct = action.payload
            state.wishlistShop.push(newProduct);
            console.log("product added to wishlistShop.")
        },

        // removing product from wishlistShop 
        removeProductToWishlistShop: (state, action) => {
            const isAlreadyExists = state.wishlistShop.findIndex(p => p._id.toString() === action.payload._id.toString());
            if (isAlreadyExists !== -1) {
                state.wishlistShop.splice(isAlreadyExists, 1);
                console.log("product removed from wishlistShop successfully.")
            }
        }
    }
})



export const { addProductToWishlistShop, removeProductToWishlistShop } = WishlistShopSlice.actions;

export default WishlistShopSlice.reducer