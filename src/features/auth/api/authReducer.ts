import {createSlice} from "@reduxjs/toolkit";
import {setAppStatus, setIsInitialized} from "@/app/appReducer";
import {authAPI, LoginParamsType} from "@/features/auth/api/authApi";
import {handleServerNetworkError} from "@/common/utils/handleServerNetworkError";
import {clearState} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import {handleServerAppError} from "@/common/utils/handleServerAppError";
import {createAppAsyncThunk} from "@/common/utils/createAppAsyncThunk";


const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLogged
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLogged
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLogged
            })
    }
})

export const authReducer = slice.reducer

// THUNKS
export const login = createAppAsyncThunk<{
    isLogged: boolean
}, LoginParamsType>('auth/login', async (arg: LoginParamsType, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatus({status: "loading"}))
        const res = await authAPI.login(arg);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return {isLogged: true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(res.data)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const logout = createAppAsyncThunk<{ isLogged: boolean }, undefined>('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatus({status: "loading"}))
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            dispatch(clearState())
            return {isLogged: false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
const initializeApp = createAppAsyncThunk<{
    isLogged: boolean
}, undefined>('auth/initializeApp', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            return {isLogged: true}
        } else {
            //handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setIsInitialized({isInitialized: true}))
    }
})
export const authThunks = {login, logout, initializeApp}
