import {Action, combineReducers} from "redux";
import {tasksReducer} from "./tasksReducer/tasksReducer.ts";
import {todoListsReducer} from "./todoListsReducer/todoListsReducer.ts";
import {thunk, ThunkDispatch} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .prepend(thunk)
})



export const setupStore = ()=> store

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatchType = AppStoreType['dispatch']
export type AppThunkDispatchType<Arg = void> = ThunkDispatch<RootStateType, Arg, Action>




// @ts-ignore
window.store = store