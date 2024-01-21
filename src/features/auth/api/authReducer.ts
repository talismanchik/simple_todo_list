import {createSlice} from "@reduxjs/toolkit";
import {setAppStatus, setIsInitialized} from "@/app/appReducer";
import {authAPI, LoginParamsType} from "@/features/auth/api/authApi";
import {clearState} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import {createAppAsyncThunk} from "@/common/utils";
import {handleServerAppError, thunkTryCatch} from "@/common/utils";


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
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.login(arg);
        if (res.data.resultCode === 0) {
            return {isLogged: true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(res.data)
        }
    })
})
export const logout = createAppAsyncThunk<{ isLogged: boolean }, undefined>('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        dispatch(setAppStatus({status: "loading"}))
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            dispatch(clearState())
            return {isLogged: false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})
const initializeApp = createAppAsyncThunk<{
    isLogged: boolean
}, undefined>('auth/initializeApp', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            return {isLogged: true}
        } else {
            return rejectWithValue(null)
        }
    }).finally(() => {
        dispatch(setIsInitialized({isInitialized: true}))
    })
})
export const authThunks = {login, logout, initializeApp}
