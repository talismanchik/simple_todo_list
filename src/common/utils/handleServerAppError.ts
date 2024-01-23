import {BaseResponseType} from "@/common/types/commonTypes";
import {AppDispatchType} from "@/app/store";
import {setAppError} from "@/app/appReducer";

export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: AppDispatchType, showError: boolean = true) => {
    if (showError) {
        dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error!...'}))
    }
}