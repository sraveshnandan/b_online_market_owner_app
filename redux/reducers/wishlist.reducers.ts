import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";


interface IinitialState {
    wishlist: IProduct[]
}

const initialState: IinitialState = {
    wishlist: []
}

const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        // adding product to wislist 
        addProductToWishlist: (state, action) => {
            const isAlreadyExists = state.wishlist.findIndex(p => p._id.toString() === action.payload._id.toString());
            if (isAlreadyExists !== -1) {
                state.wishlist.splice(isAlreadyExists, 1);
                console.log("product already exists, removing it.")
            }
            const newProduct = action.payload
            state.wishlist.push(newProduct);
            console.log("product added to wishlist.")
        },

        // removing product from wishlist 
        removeProductToWishlist: (state, action) => {
            const isAlreadyExists = state.wishlist.findIndex(p => p._id.toString() === action.payload._id.toString());
            if (isAlreadyExists !== -1) {
                state.wishlist.splice(isAlreadyExists, 1);
                console.log("product removed from wishlist successfully.")
            }
        }
    }
})



export const { addProductToWishlist, removeProductToWishlist } = WishlistSlice.actions;

export default WishlistSlice.reducer