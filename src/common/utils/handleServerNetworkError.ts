import {setAppError, setAppStatus} from "@/app/appReducer";
import axios from "axios";
import {AppDispatchType} from "@/app/store";




export const handleServerNetworkError = (error: unknown, dispatch: AppDispatchType) => {
    let errorMessage = 'Some error occurred'
    if (axios.isAxiosError(error)) {
        errorMessage = errorMessage || error?.message || error.response?.data?.message
    } else if (error instanceof Error) {
        errorMessage = `Native error: ${error.message}`
    } else {
        errorMessage = JSON.stringify(error)
    }
    dispatch(setAppStatus({status: 'failed'}))
    dispatch(setAppError({error: errorMessage}))
}
