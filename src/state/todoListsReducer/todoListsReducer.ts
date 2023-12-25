import {FilterValuesType} from "../../App.tsx";
import {v1} from "uuid";

const initialState: TodoListType[] = [
    // {id: 'todoListId1', title: 'What to learn', filter: 'all'},
    //  {id: 'todoListId2', title: 'What to buy', filter: 'all'},
 ]
export const todoListsReducer = (state: TodoListType[] = initialState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return state.filter(tl => tl.id != action.todoListId)
        case "ADD_TODOLIST":
            return [{id: action.todoListId, title: action.title, filter: "all"}, ...state]
        case "CHANGE_TODOLIST_TITLE":
            return state.map(td => td.id === action.todolistId ? {...td, title: action.newTitle} : td)
        case "CHANGE_TODOLIST_FILTER":
            return state.map(td => td.id === action.todolistId ? {...td, filter: action.newFilter} : td)
        default:
            return state
    }
}

//ACTION TYPES
export type RemoveTodolistAT = {
    type: 'REMOVE_TODOLIST',
    todoListId: string
}
export type AddTodolistAT = {
    type: 'ADD_TODOLIST',
    title: string
    todoListId: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE_TODOLIST_TITLE',
    newTitle: string
    todolistId: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE_TODOLIST_FILTER',
    newFilter: FilterValuesType
    todolistId: string
}

// ACTION CREATORS
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: 'REMOVE_TODOLIST', todoListId: todolistId}
}
export const AddTodoListAC = (title: string): AddTodolistAT => {
    return {type: 'ADD_TODOLIST', title, todoListId: v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE_TODOLIST_TITLE', newTitle, todolistId}
}
export const ChangeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE_TODOLIST_FILTER', newFilter, todolistId}
}

type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}