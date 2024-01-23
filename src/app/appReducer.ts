import {AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(isPending, (state) => {
                state.status = 'loading'
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addMatcher(isRejected, (state, action: AnyAction) => {
                //debugger
                state.status = 'failed'
                if (action.payload){
                    state.error = action.payload.messages[0]
                }else {
                    state.error = action.error.message ? action.error.message : 'Some error'
                }
            })
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError, setIsInitialized} = slice.actions


//TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
