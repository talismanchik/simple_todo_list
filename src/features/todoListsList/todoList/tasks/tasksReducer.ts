import {addTodoList, clearState, removeTodoList, setTodoLists} from "../todoListsReducer";
import {ArgAddTask, ArgUpdateTask, tasksAPI, TaskType, UpdateTaskModelType} from "@/api/tasksApi";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType, setAppStatus} from "../../../../app/appReducer";
import {handleServerNetworkError} from "@/common/utils/handleServerNetworkError";
import {createAppAsyncThunk} from "@/common/utils/createAppAsyncThunk";
import {handleServerAppError} from "@/common/utils/handleServerAppError";

const initialState: TasksStateType = {}


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {

        changeTaskEntityStatus(state, action: PayloadAction<{
            todoListId: string,
            taskId: string,
            entityStatus: RequestStatusType
        }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(el => el.id === action.payload.taskId)
            tasks[index].entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: builder => {
        builder
            .addCase(addTodoList, (state, action) => {
                state[action.payload.todoList.id] = []
            })
            .addCase(removeTodoList, (state, action) => {
                delete state[action.payload.todoListId]
            })
            .addCase(setTodoLists, (state, action) => {
                action.payload.todoLists.forEach(el => state[el.id] = [])
            })
            .addCase(clearState, () => {
                return {}
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks.map(el => ({...el, entityStatus: 'idle'}))
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                index > -1 && tasks.splice(index, 1)
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'})
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            })
    }
})

export const tasksReducer = slice.reducer
export const {
    // removeTask,
    //addTask,
    // updateTask,
    changeTaskEntityStatus,
} = slice.actions

//THUNKS

export const fetchTasks = createAppAsyncThunk<{
    todoListId: string,
    tasks: TaskType[]
}, string>('tasks/fetchTasks', async (todoListId: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatus({status: "loading"}))
        const res = await tasksAPI.getTasks(todoListId);
        dispatch(setAppStatus({status: "succeeded"}));
        return {todoListId, tasks: res.data.items};
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return rejectWithValue(null)
    }
})
export const addTask = createAppAsyncThunk<{ task: TaskType }, ArgAddTask>('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatus({status: "loading"}))
        const res = await tasksAPI.createTasks(arg)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: "succeeded"}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return rejectWithValue(null)
    }
})

export const updateTask = createAppAsyncThunk<ArgUpdateTask, ArgUpdateTask>('tasks/updateTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    try {
        const task = getState().tasks[arg.todoListId].find(t => t.id === arg.taskId)
        if (!task) {
            return rejectWithValue(null)
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...arg.model,
        }
        dispatch(setAppStatus({status: "loading"}))
        dispatch(changeTaskEntityStatus({todoListId: arg.todoListId, taskId: arg.taskId, entityStatus: "loading"}))
        const res = await tasksAPI.updateTasks({todoListId: arg.todoListId, taskId: arg.taskId, model: apiModel})
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: "succeeded"}))
            dispatch(changeTaskEntityStatus({
                todoListId: arg.todoListId,
                taskId: arg.taskId,
                entityStatus: "succeeded"
            }))
            return arg
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setAppStatus({status: "succeeded"}))
            return rejectWithValue(null)
        }

    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return rejectWithValue(null)
    }
})

export const removeTask = createAppAsyncThunk<any, any>('tasks/removeTask', async (param: {
    todoListId: string,
    taskId: string
}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatus({status: "loading"}))
        dispatch(changeTaskEntityStatus({
            todoListId: param.todoListId,
            taskId: param.taskId,
            entityStatus: "loading"
        }))
        const res = await tasksAPI.deleteTasks(param.todoListId, param.taskId)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: "succeeded"}))
            dispatch(changeTaskEntityStatus({
                todoListId: param.todoListId,
                taskId: param.taskId,
                entityStatus: "succeeded"
            }))
            return {todoListId: param.todoListId, taskId: param.taskId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return rejectWithValue(null)
    }
})


//

export const tasksThunks = {fetchTasks, addTask, updateTask, removeTask}

// TYPES
// type TasksActionType =
//     | ReturnType<typeof removeTask>
//     | ReturnType<typeof addTask>
//     | ReturnType<typeof fetchTasks>
//     | ReturnType<typeof addTodoList>
//     | ReturnType<typeof removeTodoList>
//     | ReturnType<typeof setTodoLists>
//     | ReturnType<typeof updateTask>
//     | ReturnType<typeof setAppStatus>
//     | ReturnType<typeof setAppError>
//     | ReturnType<typeof changeTaskEntityStatus>


export type TasksStateType = {
    [key: string]: TaskDomainType[]
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}
// type ThunkDispatch = Dispatch<TasksActionType>