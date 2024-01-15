import {addTodoList, clearState, removeTodoList, setTodoLists} from "../todoListsReducer/todoListsReducer";
import {tasksAPI, TaskType, UpdateTaskModelType} from "@/api/tasksApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {RootStateType} from "../store";
import {RequestStatusType, setAppStatus} from "../appReducer/appReducer";
import {handleServerAppError, handleServerNetworkError} from "@/utils/error-utils";
import {createAppAsyncThunk} from "@/utils/createAppAsyncThunk";

const initialState: TasksStateType = {}





const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask(state, action: PayloadAction<{
            task: TaskType
        }>) {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'})
        },
        updateTask(state, action: PayloadAction<{
            todoListId: string,
            taskId: string,
            model: UpdateDomainTaskModelType
        }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
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
            .addCase(removeTaskTC.fulfilled, (state, action)=>{
                const tasks = state[action.payload.todoListId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                index > -1 && tasks.splice(index, 1)
            })
    }
})

export const tasksReducer = slice.reducer
export const {
    // removeTask,
    addTask,
    updateTask,
    changeTaskEntityStatus,
} = slice.actions



//THUNKS

export const fetchTasks = createAppAsyncThunk<{todoListId: string, tasks: TaskType[]}, string>('tasks/fetchTasks', async (todoListId: string, thunkAPI) => {
    const {dispatch, rejectWithValue}= thunkAPI
    try {
        dispatch(setAppStatus({status: "loading"}))
        const res = await tasksAPI.getTasks(todoListId);
        dispatch(setAppStatus({status: "succeeded"}));
        return {todoListId, tasks: res.data.items};
    }
    catch (error: any){
        handleServerNetworkError(error, thunkAPI.dispatch)
        return rejectWithValue(null)
    }

    // .catch(error => {
    //     handleServerNetworkError(error, thunkAPI.dispatch)
    // })
})
export const removeTaskTC = createAsyncThunk('tasks/removeTask', (param:{todoListId: string, taskId: string}, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    thunkAPI.dispatch(changeTaskEntityStatus({todoListId: param.todoListId, taskId: param.taskId, entityStatus: "loading"}))
    return tasksAPI.deleteTasks(param.todoListId, param.taskId)
        .then(() => {
            // if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return {todoListId: param.todoListId, taskId: param.taskId}
            // }
            // else {
            //     handleServerAppError(res.data, thunkAPI.dispatch)
            // }
        })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
})

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    tasksAPI.createTasks(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTask({task: res.data.data.item}))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todoListId: string, taskId: string, changeElement: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => RootStateType) => {
        const task = getState().tasks[todoListId].find(t => t.id === taskId)

        if (!task) return
        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...changeElement
        }

        dispatch(setAppStatus({status: "loading"}))
        dispatch(changeTaskEntityStatus({todoListId, taskId, entityStatus: "loading"}))
        tasksAPI.updateTasks(todoListId, taskId, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTask({todoListId, taskId, model: changeElement}))
                    dispatch(setAppStatus({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(changeTaskEntityStatus({todoListId, taskId, entityStatus: "succeeded"}))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }

export const tasksThunks = {fetchTasks}

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