import {
    ArgUpdateTodoList,
    todoListsAPI,
    TodoListType
} from "@/features/todoListsList/todoList/todoListApi/todoListsApi";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "@/app/appReducer";
import {createAppAsyncThunk} from "@/common/utils";
import {handleServerAppError, thunkTryCatch} from "@/common/utils";


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
export const {changeTodoListFilter, changeTodoListEntityStatus, clearState,} = slice.actions

// THUNKS
export const fetchTodoLists = createAppAsyncThunk<{
    todoLists: TodoListType[]
}, undefined>('todoLists/fetchTodoList', async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todoListsAPI.getTodoLists()
        return {todoLists: res.data}
    })
})
export const removeTodoList = createAppAsyncThunk<{
    todoListId: string
}, string>('todoLists/removeTodoLists', async (todoListId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        dispatch(changeTodoListEntityStatus({todoListId, entityStatus: "loading"}))
        const res = await todoListsAPI.deleteTodoList(todoListId)
        if (res.data.resultCode === 0) {
            return {todoListId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})
export const addTodoList = createAppAsyncThunk<{
    todoList: TodoListType
}, string>('todoLists/addTodoLists', async (title, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todoListsAPI.createTodoList(title)
        if (res.data.resultCode === 0) {
            return {todoList: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})
export const changeTodoListTitle = createAppAsyncThunk<ArgUpdateTodoList, ArgUpdateTodoList>('todoLists/changeTodoListTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todoListsAPI.updateTodoList(arg)
        if (res.data.resultCode === 0) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})
export const todoListThunks = {fetchTodoLists, addTodoList, removeTodoList, changeTodoListTitle}

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type FilterValuesType = 'all' | 'completed' | 'active'

