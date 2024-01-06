import {
    addTodoList,
    removeTodoList,
    setTodoLists,
} from "../todoListsReducer/todoListsReducer.ts";
import {tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasksApi.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {RootStateType} from "../store.ts";


const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTask(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            index > -1 && tasks.splice(index, 1)
        },
        addTask(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
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
        changeTaskTitle(state, action: PayloadAction<{
            todoListId: string,
            taskId: string,
            changeTaskTitle: string
        }>) {
            state[action.payload.todoListId].map(t =>
                t.id === action.payload.taskId
                    ? t.title = action.payload.changeTaskTitle
                    : t)
        },
        changeTaskStatus(state, action: PayloadAction<{
            todoListId: string,
            taskId: string,
            changeTaskStatus: TaskStatuses
        }>) {
            state[action.payload.todoListId].map(t =>
                t.id === action.payload.taskId
                    ? t.status = action.payload.changeTaskStatus
                    : t)
        },
        fetchTasks(state, action: PayloadAction<{ todoListId: string, tasks: TaskType[] }>) {
            state[action.payload.todoListId] = action.payload.tasks
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
    changeTaskTitle,
    changeTaskStatus,
    fetchTasks,
    updateTask,
} = slice.actions

//THUNKS
export const fetchTasksTC = (todoListId: string) => (dispatch: ThunkDispatch) => {
    tasksAPI.getTasks(todoListId)
        .then(res => {
            dispatch(fetchTasks({todoListId, tasks: res.data.items}))
        })
}
export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: ThunkDispatch) => {
    tasksAPI.deleteTasks(todoListId, taskId)
        .then(() => {
            dispatch(removeTask({todoListId: todoListId, taskId: taskId}))
        })
}
export const addTaskTC = (todoListId: string, title: string) => (dispatch: ThunkDispatch) => {
    tasksAPI.createTasks(todoListId, title)
        .then(res => {
            console.log(res.data.data.item)
            dispatch(addTask({task: res.data.data.item}))
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

        tasksAPI.updateTasks(todoListId, taskId, model)
            .then(() => {
                dispatch(updateTask({todoListId, taskId, model: changeElement}))
            })
    }

// TYPES
type TasksActionType =
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof changeTaskTitle>
    | ReturnType<typeof changeTaskStatus>
    | ReturnType<typeof fetchTasks>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof setTodoLists>
    | ReturnType<typeof updateTask>


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

export type TaskDomainType = TaskType
type ThunkDispatch = Dispatch<TasksActionType>