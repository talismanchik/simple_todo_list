import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {setAppStatus, setIsInitialized} from "@/app/appReducer";
import {authAPI, LoginParamsType} from "@/features/auth/api/authApi";
import {clearState} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import {createAppAsyncThunk} from "@/common/utils";


const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled), (state, action) => {
                state.isLoggedIn = action.payload.isLogged
            })
    }
})

export const authReducer = slice.reducer

// THUNKS
export const login = createAppAsyncThunk<{
    isLogged: boolean
}, LoginParamsType>('auth/login', async (arg: LoginParamsType, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    const res = await authAPI.login(arg);
    if (res.data.resultCode === 0) {
        return {isLogged: true}
    } else {
        //handleServerAppError(res.data, dispatch)
        return rejectWithValue(res.data)
    }
})
export const logout = createAppAsyncThunk<{ isLogged: boolean }, undefined>('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: "loading"}))
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
        dispatch(clearState())
        return {isLogged: false}
    } else {
        return rejectWithValue(res.data)
    }
})
const initializeApp = createAppAsyncThunk<{
    isLogged: boolean
}, undefined>('auth/initializeApp', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    const res = await authAPI.me()
        .finally(() => {
        dispatch(setIsInitialized({isInitialized: true}))
    })
    if (res.data.resultCode === 0) {
        return {isLogged: true}
    } else {
        return rejectWithValue(res.data)
    }
})
export const authThunks = {login, logout, initializeApp}
