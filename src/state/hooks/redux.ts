import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppThunkDispatchType, RootStateType} from "../store";

export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector