import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatchType, RootStateType} from "@/state/store";

export  const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootStateType;
    dispatch: AppDispatchType;
    rejectValue: null;
}>()