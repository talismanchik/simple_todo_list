import {
    addTodoList,
    removeTodoList,
    setTodoLists,
} from "../todoListsReducer/todoListsReducer.ts";
import {tasksAPI, TaskType, UpdateTaskModelType} from "../../api/tasksApi.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {RootStateType} from "../store.ts";
import {RequestStatusType, setAppError, setAppStatus} from "../appReducer/appReducer.ts";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils.ts";


const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTask(state, action: PayloadAction<{
            todoListId: string,
            taskId: string
        }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            index > -1 && tasks.splice(index, 1)
        },
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
        changeTaskEntityStatus(state, action: PayloadAction<{ todoListId: string, taskId: string, entityStatus: RequestStatusType }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(el => el.id === action.payload.taskId)
            tasks[index].entityStatus = action.payload.entityStatus
        },
        fetchTasks(state, action: PayloadAction<{
            todoListId: string,
            tasks: TaskType[]
        }>) {
            state[action.payload.todoListId] = action.payload.tasks.map(el => ({...el, entityStatus: 'idle'}))
        }
    },
    extraReducers: builder => {
        builder.addCase(addTodoList, (state, action) => {
            state[action.payload.todoList.id] = []
        });
        builder.addCase(removeTodoList, (state, action) => {
            delete state[action.payload.todoListId]
        });
        builder.addCase(setTodoLists, (state, action) => {
            action.payload.todoLists.forEach(el => state[el.id] = [])
        })
    }
})

export const tasksReducer = slice.reducer
export const {
    removeTask,
    addTask,
    fetchTasks,
    updateTask,
    changeTaskEntityStatus,
} = slice.actions

//THUNKS
export const fetchTasksTC = (todoListId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    tasksAPI.getTasks(todoListId)
        .then(res => {
            dispatch(fetchTasks({todoListId, tasks: res.data.items}))
            dispatch(setAppStatus({status: "succeeded"}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    dispatch(changeTaskEntityStatus({todoListId, taskId, entityStatus: "loading"}))
    tasksAPI.deleteTasks(todoListId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTask({todoListId: todoListId, taskId: taskId}))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (todoListId: string, title: string) => (dispatch: ThunkDispatch) => {
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
    (dispatch: ThunkDispatch, getState: () => RootStateType) => {
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

// TYPES
type TasksActionType =
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof fetchTasks>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof setTodoLists>
    | ReturnType<typeof updateTask>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof changeTaskEntityStatus>


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
type ThunkDispatch = Dispatch<TasksActionType>