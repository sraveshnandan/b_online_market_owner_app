import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";



interface IinitialState {
    cart: { product: IProduct; quantity: number; totalPrice: number }[] | [];
}
const initialState: IinitialState = {
    cart: [],
}
const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // adding item to the cart 
        addProductToCart: (state, action) => {
            // checking if item is already present in cart
            const alreadyExists = state.cart.findIndex(
                (item) => item.product._id?.toString() === action.payload._id.toString()
            );
            // if item already exists in cart
            if (alreadyExists !== -1) {
                const cartItem = state.cart[alreadyExists] as any;
                state.cart[alreadyExists].quantity++;
                state.cart[alreadyExists].totalPrice =
                    cartItem.product.discountPrice * cartItem.quantity;
                console.log("Product already exists in cart, updating quantity.");
            } else {
                const newItem = {
                    product: action.payload as IProduct,
                    quantity: 1,
                    totalPrice: Number(action.payload.discountPrice),
                };

                state.cart.push(newItem as never);
                console.log("Product added to cart successfully.");
            }
        },
        // removing item to the cart 
        removeProductToCart: (state, action) => {
            // finding index of that particular item
            const alreadyExist = state.cart.findIndex(
                (item) => item.product._id?.toString() === action.payload._id.toString()
            );
            state.cart.splice(alreadyExist, 1);
        },
        // increasing product quantity 
        increementQuantity: (state, action) => {
            // Finding item index
            const itemIndex = state.cart.findIndex(
                (item) => item.product._id === action.payload._id
            );
            if (itemIndex !== -1) {
                const item = state.cart[itemIndex];
                state.cart[itemIndex].quantity++;
                state.cart[itemIndex].totalPrice =
                    item.quantity * item.product.discountPrice!;
                console.log("Cart item updated successfully.");
            }
        },
        // deccreasing product quantity 
        decreseQuantity: (state, action) => {
            // Finding item index
            const itemIndex = state.cart.findIndex(
                (item) => item.product._id?.toString() === action.payload._id.toString()
            );
            if (state.cart[itemIndex].quantity === 1) {
                state.cart.splice(itemIndex, 1);
                console.log("Product removed successfully.");
            } else {
                const item = state.cart[itemIndex];
                state.cart[itemIndex].quantity--;
                state.cart[itemIndex].totalPrice =
                    item.quantity * item.product.discountPrice!;
                console.log("Product details updated successfully.");
            }
        },
        // clearing cart item 
        clearCart: (state) => {
            state.cart = [];
            console.log("cart cleared successfully.")
        }
    }
});

export const { addProductToCart, increementQuantity, decreseQuantity, clearCart, removeProductToCart } = CartSlice.actions
export default CartSlice.reducer