import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasksReducer/tasksReducer.ts";
import {todoListsReducer} from "./todoListsReducer/todoListsReducer.ts";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
})

export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store