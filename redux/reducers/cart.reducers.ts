import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";



interface IinitialState {
    cart: [{ product: IProduct, quantity: number }],
}
const initialState: IinitialState = {
    cart: [],
}
const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // adding item to the cart 
        addToCart: (state, action) => {
            const isProductExists = state.cart.findIndex(c => c.product._id.toString() === action.payload._id.toString());

            if (isProductExists !== -1) {
                state.cart.splice(isProductExists, 1);
                console.log("product already exists, removing it successfully.")
            } else {
                const newCartItem = { product: action.payload, quantity: 1 }
                state.cart.push(newCartItem);

                console.log("product added to cart successfully.")
            }
        },
        // removing item to the cart 
        removeToCart: (state, action) => {
            const isProductExists = state.cart.findIndex(c => c.product._id.toString() === action.payload._id.toString());
            state.cart.splice(isProductExists, 1);
            console.log("product removed successfully.")
        },
        // increasing product quantity 
        increementQuantity: (state, action) => {
            const productIndenx = state.cart.findIndex(c => c.product._id.toString() === action.payload._id.toString());
            state.cart[productIndenx].quantity += 1;
            console.log("product quality increased successfully..")
        },
        // deccreasing product quantity 
        decreseQuantity: (state, action) => {
            const productIndenx = state.cart.findIndex(c => c.product._id.toString() === action.payload._id.toString());
            state.cart[productIndenx].quantity -= 1;
            console.log("product quality decreased successfully..")
        },
        // clearing cart item 
        clearCart: (state) => {
            state.cart = [];
            console.log("cart cleared successfully.")
        }
    }
});

export const { addToCart, increementQuantity, decreseQuantity, clearCart, removeToCart } = CartSlice.actions
export default CartSlice.reducer