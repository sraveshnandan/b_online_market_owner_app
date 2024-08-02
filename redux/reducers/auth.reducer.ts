import { IShop, IUser } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    authState: boolean;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    authToken: string;
    userData: IUser;
    userShop: IShop;
}


// for fetching user profile
const fetchUserProfile = createAsyncThunk(
    "fetchUserProfile",
    async (params: { token: string }, thunkAPI) => {
        try {
            const { token } = params;
            const resp = await fetch("https://bom-api-1-0-1.onrender.com/api/v1/user/profile", {
                headers: {
                    token: token,
                },
            });

            const data = await resp.json()
            console.log("user profile refreshed successfully.");
            return data
        } catch (error: any) {
            console.log("error occurred while fetching user profile.", error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState: IinitialState = {
    authState: false,
    isLoading: false,
    isError: false,
    isSuccess: false,
    authToken: "",
    userData: {} as any,
    userShop: {} as any,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        loginUser: (state, action) => {
            state.authToken = action.payload.token;
            state.userData = action.payload.user;
        },
        registerUser: (state, action) => {
            state.authState = true;
            state.authToken = action.payload.token;
            state.userData = action.payload.user;
        },
        setUserData: (state, action) => {
            state.userData.email = action.payload.email;
            state.userData.full_name = action.payload.full_name;
            state.userData.avatar = action.payload.avatar;
            state.userData.pin_code = action.payload.pin_code;
        },
        logout: (state) => {
            state.authState = false;
            state.authToken = "";
            state.userData = {} as any;
            state.userShop = {} as any;
        },
        setUserShopData: (state, action) => {
            state.userShop = action.payload;
        },
    },
    extraReducers: (builder) => {
        // fetchUserProfile pending case
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.isLoading = true;
        });

        // fetchUserProfile fulfilled case
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload.profile;
            state.userShop = action.payload.shop; // Set userShop data
            state.authToken = action.payload.token;
            state.authState = true;
        });

        // fetchUserProfile rejected case
        builder.addCase(fetchUserProfile.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export { fetchUserProfile };
export const { setLoading, registerUser, setUserData, logout, setUserShopData, loginUser } = AuthSlice.actions;
export default AuthSlice.reducer;
