import { IUser } from "@/types";
import { API } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



interface IinitialState {
    authState: boolean,
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
});



// for fetching user profile 

const fetchUserProfile = createAsyncThunk("fetchUserProfile", async (params: { token: string }, thunkAPi) => {
    try {
        console.log("fetchuserProfile params", params);
        const { token } = params

        const resp = await API.get("user/profile", {
            headers: {
                token: token,
            }
        });
        console.log("user profile refreshed successfully.")
        return resp.data

    } catch (error: any) {
        console.log("error occured while fetching user profile.", error.message);
        thunkAPi.rejectWithValue(error.message)
    }
});





const initialState: IinitialState = {
    authState: false,
    isLoading: false,
    isError: false,
    isSuccess: false,
    authToken: "",
    userData: {} as any
}
const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },

        registerUser: (state, action) => {
            state.authState = true;
            state.authToken = action.payload.token;
            state.userData = action.payload.user
        },
        setUserData: (state, action) => {
            state.userData.email = action.payload.email;
            state.userData.full_name = action.payload.full_name;
            state.userData.avatar = action.payload.avatar;
            state.userData.pin_code = action.payload.pin_code
        },
        logout: (state, action) => {
            state.authState = false;
            state.authToken = "";
            state.userData = {} as any
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
            state.authState = true;
            state.userData = action.payload.user;
            state.authToken = action.payload.token;
        })

        // login error state 
        builder.addCase(login.rejected, state => {
            state.isLoading = false;
            state.isError = true;
        })


        // fetchUserProfile pending case 
        builder.addCase(fetchUserProfile.pending, state => {
            state.isLoading = true
        })

        // fetchUserProfile fullfilled  case 
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload.profile;
            state.authToken = action.payload.token;

            state.authState = true;

        })

        // fetchUserProfile rejected  case 
        builder.addCase(fetchUserProfile.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})



export { login, fetchUserProfile }
export const { setLoading, registerUser, setUserData, logout } = AuthSlice.actions
export default AuthSlice.reducer