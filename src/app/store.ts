import {combineReducers} from "redux";
import {tasksReducer} from "@/features/todoListsList/todoList/tasks/tasksReducer";
import {todoListsReducer} from "@/features/todoListsList/todoList/todoListsReducer";
import {thunk} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appReducer";
import {authReducer} from "@/features/auth/api/authReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .prepend(thunk)
})


export const setupStore = () => store

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatchType = typeof store.dispatch
// export type AppThunkDispatchType<Arg = void> = ThunkDispatch<RootStateType, Arg, Action>


// @ts-ignore
window.store = store