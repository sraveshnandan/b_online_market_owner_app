import { IBanners, ICategory, IOrder, IProduct, IShop } from "@/types";
import { API } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



interface IinitialState {
    isloading: boolean,
    isError: boolean,
    errMessage: string,
    isSuccess: boolean,
    shops: IShop[],
    products: IProduct[],
    orders: IOrder[],
    categories: ICategory[],
    banners: IBanners[]

}
const initialState: IinitialState = {
    isloading: false,
    isError: false,
    errMessage: "",
    isSuccess: false,
    shops: [],
    products: [],
    orders: [],
    categories: [],
    banners: []
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
            const { banners, categories, shops, orders, products } = action.payload.result
            state.banners = banners
            state.categories = categories
            state.shops = shops;
            state.orders = orders;
            state.products = products

        })

        // error case 
        builder.addCase(fetchAlldata.rejected, state => {
            state.isError = true;
            state.errMessage = "Unable to fetch some data."

        })
    }
})

export default mainSlice.reducer

export { fetchAlldata }