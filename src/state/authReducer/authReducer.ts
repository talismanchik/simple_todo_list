import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setAppStatus} from "../appReducer/appReducer";
import {authAPI, LoginParamsType} from "@/api/authApi";
import {handleServerAppError, handleServerNetworkError} from "@/utils/error-utils";
import {clearState} from "@/state/todoListsReducer/todoListsReducer";

export const loginTC = createAsyncThunk('auth/login', async (date: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await authAPI.login(date);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return {isLogged: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return {isLogged: false}
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return {isLogged: false}
    }
})


const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLogged: boolean }>) {
            state.isLoggedIn = action.payload.isLogged
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled,  (state, action)=>{
            state.isLoggedIn = action.payload.isLogged
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

// THUNKS

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({isLogged: false}))
                dispatch(setAppStatus({status: "succeeded"}))
                dispatch(clearState())
            } else handleServerAppError(res.data, dispatch)
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}


// TYPES
// type ActionsType =
//     | ReturnType<typeof setIsLoggedIn>
//     | ReturnType<typeof setAppStatus>
//     | ReturnType<typeof clearState>


//type ThunkDispatch = Dispatch<ActionsType>