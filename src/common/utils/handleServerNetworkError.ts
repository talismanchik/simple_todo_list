import {setAppError} from "@/app/appReducer";
import axios from "axios";
import {AppDispatchType} from "@/app/store";


export const handleServerNetworkError = (error: unknown, dispatch: AppDispatchType) => {
    let errorMessage = 'Some error occurred'
    if (axios.isAxiosError(error)) {
        errorMessage =  error?.message || error.response?.data?.message || errorMessage
    } else if (error instanceof Error) {
        errorMessage = `Native error: ${error.message}`
    } else {
        errorMessage = JSON.stringify(error)
    }
    dispatch(setAppError({error: errorMessage}))
}
