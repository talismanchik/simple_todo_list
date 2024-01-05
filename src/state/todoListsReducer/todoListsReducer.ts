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




// THUNKS
export const fetchTodoListsTC = () => (dispatch: ThunkDispatch) => {
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoLists({todoLists: res.data}))
        })
}


type TodoListActionType =
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof changeTodoListTitle>
    | ReturnType<typeof changeTodoListFilter>
    | ReturnType<typeof setTodoLists>

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'completed' | 'active'

type ThunkDispatch = Dispatch<TodoListActionType>
