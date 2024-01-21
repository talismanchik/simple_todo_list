import {tasksReducer} from "@/features/todoListsList/todoList/tasks/tasksApi/tasksReducer";
import {todoListsReducer} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appReducer";
import {authReducer} from "@/features/auth/api/authReducer";



export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todoLists: todoListsReducer,
        app: appReducer,
        auth: authReducer,
    },

})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

// @ts-ignore
window.store = store