import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setAppStatus} from "../appReducer/appReducer";
import {authAPI, LoginParamsType} from "@/api/authApi";
import {handleServerAppError, handleServerNetworkError} from "@/utils/error-utils";
import {clearState} from "@/state/todoListsReducer/todoListsReducer";

const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLogged: boolean }>) {
            state.isLoggedIn = action.payload.isLogged
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

// THUNKS
export const loginTC = (date: LoginParamsType) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    authAPI.login(date)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({isLogged: true}))
                dispatch(setAppStatus({status: "succeeded"}))
            } else handleServerAppError(res.data, dispatch)
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}
export const logoutTC = () => (dispatch: ThunkDispatch) => {
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
type ActionsType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof clearState>


type ThunkDispatch = Dispatch<ActionsType>