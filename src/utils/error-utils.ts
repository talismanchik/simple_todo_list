import {setAppError, setAppStatus} from "@/state/appReducer/appReducer";
import {ResponseType} from "@/api/todoListsApi";
import axios from "axios";
import {AppDispatchType} from "@/state/store";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Some error!...'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: unknown, dispatch: AppDispatchType) => {
    let errorMessage = 'Some error occurred'
    if (axios.isAxiosError(error)) {
        errorMessage = errorMessage || error?.message || error.response?.data?.message
    } else if (error instanceof Error) {
        error = `Native error: ${error.message}`
    } else {
        errorMessage = JSON.stringify(error)
    }
    dispatch(setAppStatus({status: 'failed'}))
    dispatch(setAppError({error: errorMessage}))
}
