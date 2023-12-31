import {FilterValuesType} from "../../App.tsx";
import {v1} from "uuid";
import {todoListsAPI, TodoListType} from "../../api/todoListsApi.ts";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TodoListDomainType[] = [
]

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodoList(state, action: PayloadAction<{ todoListId: string }>) {
            const index = state.findIndex(el => el.id === action.payload.todoListId)
            index > -1 && state.splice(index, 1)
        },
        addTodoList(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.unshift({...action.payload.todoList, filter: 'all'})
        },
        changeTodoListTitle(state, action: PayloadAction<{ todoListId: string, title: string }>) {
            const index = state.findIndex(el => el.id === action.payload.todoListId)
            state[index].title = action.payload.title
        },
        changeTodoListFilter(state, action: PayloadAction<{ todoListId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(el => el.id === action.payload.todoListId)
            state[index].filter = action.payload.filter
        },
        setTodoLists(_, action: PayloadAction<{ todoLists: TodoListType[] }>) {
            return action.payload.todoLists.map(el => ({...el, filter: 'all'}))
        },
    }
})

export const todoListsReducer = slice.reducer
export const {
    removeTodoList,
    addTodoList,
    changeTodoListTitle,
    changeTodoListFilter,
    setTodoLists
} = slice.actions

export const todoListsReducer1 = (state: TodoListDomainType[] = initialState, action: ActionsType): TodoListDomainType[] => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return state.filter(tl => tl.id != action.todoListId)
        case "ADD_TODOLIST":
            return [{id: action.todoListId, title: action.title, filter: "all", addedDate: '', order: 0}, ...state]
        case "CHANGE_TODOLIST_TITLE":
            return state.map(td => td.id === action.todolistId ? {...td, title: action.newTitle} : td)
        case "CHANGE_TODOLIST_FILTER":
            return state.map(td => td.id === action.todolistId ? {...td, filter: action.newFilter} : td)
        case "SET_TODOLISTS":
            return action.todoLists.map(tl => ({
                ...tl,
                filter: "all"
            }))
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
export type SetTodolistsAT = {
    type: 'SET_TODOLISTS'
    todoLists: TodoListType[]
}

// ACTION CREATORS
export const RemoveTodoListAC = (todolistId: string): RemoveTodolistAT => {
    return {type: 'REMOVE_TODOLIST', todoListId: todolistId}
}
export const AddTodoListAC = (title: string): AddTodolistAT => {
    return {type: 'ADD_TODOLIST', title, todoListId: v1()}
}
export const ChangeTodoListTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE_TODOLIST_TITLE', newTitle, todolistId}
}
export const ChangeTodoListFilterAC = (todolistId: string, newFilter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE_TODOLIST_FILTER', newFilter, todolistId}
}
export const setTodoListsAC = (todoLists: TodoListType[]): SetTodolistsAT => {
    return {type: 'SET_TODOLISTS', todoLists}
}

// THUNKS
export const fetchTodoListsTC = () => (dispatch: ThunkDispatch) => {
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoListsAC(res.data))
        })
}


type ActionsType =
    | RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodolistsAT

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

type ThunkDispatch = Dispatch<ActionsType>
