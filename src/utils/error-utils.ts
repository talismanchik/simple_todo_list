import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "../state/appReducer/appReducer.ts";
import {ResponseType} from "../api/todoListsApi.ts";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Some error!...'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppStatus({status: 'failed'}))
    dispatch(setAppError({error: error.message}))
}
type ErrorUtilsDispatchType = Dispatch<
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>>