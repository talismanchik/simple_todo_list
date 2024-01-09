import {todoListsAPI, TodoListType} from "@/api/todoListsApi";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType, setAppError, setAppStatus} from "../appReducer/appReducer";
import {handleServerAppError, handleServerNetworkError} from "@/utils/error-utils";
import {fetchTasksTC} from "@/state/tasksReducer/tasksReducer";


const initialState: TodoListDomainType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodoList(state, action: PayloadAction<{
            todoListId: string
        }>) {
            const index = state.findIndex(el => el.id === action.payload.todoListId)
            index > -1 && state.splice(index, 1)
        },
        addTodoList(state, action: PayloadAction<{
            todoList: TodoListType
        }>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        },
        changeTodoListTitle(state, action: PayloadAction<{
            todoListId: string,
            title: string
        }>) {
            const index = state.findIndex(el => el.id === action.payload.todoListId)
            state[index].title = action.payload.title
        },
        changeTodoListFilter(state, action: PayloadAction<{
            todoListId: string,
            filter: FilterValuesType
        }>) {
            const index = state.findIndex(el => el.id === action.payload.todoListId)
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatus(state, action: PayloadAction<{
            todoListId: string,
            entityStatus: RequestStatusType
        }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].entityStatus = action.payload.entityStatus
        },
        setTodoLists(_, action: PayloadAction<{
            todoLists: TodoListType[]
        }>) {
            return action.payload.todoLists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        },
        clearState(state){
            state = []
        },
    }
})

export const todoListsReducer = slice.reducer
export const {
    removeTodoList,
    addTodoList,
    changeTodoListTitle,
    changeTodoListFilter,
    changeTodoListEntityStatus,
    setTodoLists,
    clearState,
} = slice.actions


// THUNKS
export const fetchTodoListsTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoLists({todoLists: res.data}))
            dispatch(setAppStatus({status: "succeeded"}))
            return res.data
        })
        .then(res=>{
            // @ts-ignore
            res.forEach(tl=> dispatch(fetchTasksTC(tl.id)))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodoListsTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    todoListsAPI.createTodoList(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoList({todoList: res.data.data.item}))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodoListsTC = (todoListId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    dispatch(changeTodoListEntityStatus({todoListId, entityStatus: "loading"}))
    todoListsAPI.deleteTodoList(todoListId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoList({todoListId}))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodoListTitleTC = (todoListId: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    todoListsAPI.updateTodoList(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitle({todoListId, title}))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

type TodoListActionType =
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof changeTodoListTitle>
    | ReturnType<typeof changeTodoListFilter>
    | ReturnType<typeof changeTodoListEntityStatus>
    | ReturnType<typeof setTodoLists>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type FilterValuesType = 'all' | 'completed' | 'active'

type ThunkDispatch = Dispatch<TodoListActionType>
