import {BaseResponseType} from "@/common/types";
import {AppDispatchType, RootStateType} from "@/app/store";
import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {handleServerNetworkError} from "@/common/utils";

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<RootStateType, unknown, AppDispatchType, null | BaseResponseType>,

    logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI;
    //dispatch(setAppStatus({ status: "loading" }));
    try {
        return await logic();
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    }
};