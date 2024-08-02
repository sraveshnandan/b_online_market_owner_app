import { ICategory, IOrder, IProduct, IShop } from "@/types";
import { API } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



interface IinitialState {
    isloading: boolean,
    isError: boolean,
    errMessage: string,
    isSuccess: boolean,
    orders: IOrder[],
    products: IProduct[],
    shops: IShop[],
    categories: ICategory[]


}
const initialState: IinitialState = {
    isloading: false,
    isError: false,
    errMessage: "",
    isSuccess: false,
    products: [],
    orders: [],
    shops: [],
    categories: []

}




const fetchAlldata = createAsyncThunk("fetchAllData", async (params, thunkAPI) => {
    console.log("fetchallData invoked.")
    try {
        const response = await API.get("getAllData?key=com.sravesh.bom");
        return response.data
    } catch (error: any) {
        console.log("error occured while fetching data from thunkApi", error.message)
        thunkAPI.rejectWithValue(error.message)
    }
})


const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        // adding new order to storage 
        addNewOrder: (state, action) => {
            state.orders.push(action.payload)
        },
        addOrUpdateProducts: (state, action) => {
            const isExists = state.products.findIndex(p => p._id.toString() === action.payload._id.toString());

            if (isExists) {
                state.products[isExists] = action.payload
            }
            state.products.push(action.payload)
        },
        removeProduct: (state, action) => {
            const productIndex = state.products.findIndex(p => p._id.toString() === action.payload._id.toString());
            if (productIndex !== -1) {
                state.products.splice(productIndex, 1)
            }
        },
        clearAllData: (state) => {
            state.categories = [];
            state.orders = [];
            state.shops = [];
            state.products = [];


        }
    },
    extraReducers: builder => {
        // pending case 
        builder.addCase(fetchAlldata.pending, state => {
            state.isloading = true
        })

        // fullfilled case 
        builder.addCase(fetchAlldata.fulfilled, (state, action) => {
            state.isloading = false;
            console.log("fetchAllData fullfilled");
            const { orders, products, shops, categories } = action.payload.result
            state.orders = orders;
            state.products = products;
            state.shops = shops;
            state.categories = categories;
        })

        // error case 
        builder.addCase(fetchAlldata.rejected, state => {
            state.isError = true;
            state.errMessage = "Unable to fetch some data."

        })
    }
})

export default mainSlice.reducer;

export const { addNewOrder, addOrUpdateProducts, clearAllData, removeProduct } = mainSlice.actions

export { fetchAlldata }