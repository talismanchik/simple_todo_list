import {ResponseType} from "@/common/types/commonTypes";
import {AppDispatchType} from "@/app/store";
import {setAppError, setAppStatus} from "@/app/appReducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Some error!...'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}