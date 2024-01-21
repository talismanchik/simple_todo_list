import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatchType, RootStateType} from "@/app/store";
import {BaseResponseType} from "@/common/types";

export  const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootStateType;
    dispatch: AppDispatchType;
    rejectValue: null | BaseResponseType;
}>()