import { IUser } from "@/types";
import { API } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



interface IinitialState {
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    authToken: string,
    userData: IUser
}


const login = createAsyncThunk("login", async (params: { phone_no: string, otp: string }, thunkAPi) => {
    try {
        console.log("login params", params);
        const { phone_no, otp } = params

        const resp = await API.post("user/login", { phone_no, otp });

        console.log("login success", resp.data);

        return resp.data

    } catch (error: any) {
        console.log("error occured while login", error.message);
        thunkAPi.rejectWithValue(error.message)
    }
})



const initialState: IinitialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    authToken: "",
    userData: {}
}
const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        // loging pending state 
        builder.addCase(login.pending, state => {
            state.isLoading = true;
        })

        // login success state 

        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload.user;
            state.authToken = action.payload.token;
        })

        // login error state 
        builder.addCase(login.rejected, state => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})



export { login }
export const { setLoading } = AuthSlice.actions
export default AuthSlice.reducer