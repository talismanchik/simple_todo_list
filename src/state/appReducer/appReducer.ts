import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus} = slice.actions


//TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
