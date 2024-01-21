import {
    ArgUpdateTodoList,
    todoListsAPI,
    TodoListType
} from "@/features/todoListsList/todoList/todoListApi/todoListsApi";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType, setAppStatus} from "@/app/appReducer";
import {handleServerNetworkError} from "@/common/utils/handleServerNetworkError";
import {handleServerAppError} from "@/common/utils/handleServerAppError";
import {createAppAsyncThunk} from "@/common/utils/createAppAsyncThunk";


const initialState: TodoListDomainType[] = []

const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
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
        clearState() {
            return []
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodoLists.fulfilled, (_, action) => {
                return action.payload.todoLists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(addTodoList.fulfilled, (state, action) => {
                state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(removeTodoList.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.todoListId)
                index > -1 && state.splice(index, 1)
            })
            .addCase(changeTodoListTitle.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.todoListId)
                state[index].title = action.payload.title
            })
    }
})

export const todoListsReducer = slice.reducer
export const {
    changeTodoListFilter,
    changeTodoListEntityStatus,
    setTodoLists,
    clearState,
} = slice.actions

// THUNKS
export const fetchTodoLists = createAppAsyncThunk<{
    todoLists: TodoListType[]
}, undefined>('todoLists/fetchTodoList', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatus({status: "loading"}))
        const res = await todoListsAPI.getTodoLists()
        dispatch(setAppStatus({status: "succeeded"}))
        return {todoLists: res.data}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return rejectWithValue(null)
    }
})
export const removeTodoList = createAppAsyncThunk<{
    todoListId: string
}, string>('todoLists/removeTodoLists', async (todoListId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatus({status: "loading"}))
        dispatch(changeTodoListEntityStatus({todoListId, entityStatus: "loading"}))
        const res = await todoListsAPI.deleteTodoList(todoListId)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: "succeeded"}))
            return {todoListId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return rejectWithValue(null)
    }
})


export const addTodoList = createAppAsyncThunk<{
    todoList: TodoListType
}, string>('todoLists/addTodoLists', async (title, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatus({status: "loading"}))
        const res = await todoListsAPI.createTodoList(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: "succeeded"}))
            return {todoList: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return rejectWithValue(null)
    }
})


export const changeTodoListTitle = createAppAsyncThunk<ArgUpdateTodoList, ArgUpdateTodoList>('todoLists/changeTodoListTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatus({status: "loading"}))
        const res = await todoListsAPI.updateTodoList(arg)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: "succeeded"}))
            return arg
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return rejectWithValue(null)
    }
})
export const todoListThunks = {fetchTodoLists, addTodoList, removeTodoList, changeTodoListTitle}


export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type FilterValuesType = 'all' | 'completed' | 'active'

