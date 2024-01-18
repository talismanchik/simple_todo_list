import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

import {setIsLoggedIn} from "../features/auth/api/authReducer";
import {authAPI} from "@/features/auth/api/authApi";


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{error: string | null}>){
            state.error = action.payload.error
        },
        setIsInitialized(state, action: PayloadAction<{isInitialized: boolean}>){
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError, setIsInitialized} = slice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res=>{
            if (res.data.resultCode ===0){
                dispatch(setIsLoggedIn({isLogged: true}))
            }
            dispatch(setIsInitialized({isInitialized: true}))
        })
}

//TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
