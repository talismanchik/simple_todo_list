import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "../todoListsReducer/todoListsReducer.ts";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "../../api/tasksApi.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {action} from "@storybook/addon-actions";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTask(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {

        },
        addTask(state, action: PayloadAction<{ todoListId: string, taskTitle: string }>) {
            state[action.payload.todoListId].unshift({
                id: v1(),
                title: action.payload.taskTitle,
                status: TaskStatuses.New,
                todoListId: action.payload.todoListId,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Middle
            })
        },
        changeTaskTitle(state, action: PayloadAction<{ todoListId: string, taskId: string, changeTaskTitle: string }>) {
            state[action.payload.todoListId].map(t =>
                t.todoListId === action.payload.todoListId
                    ? {
                        ...t,
                        title: action.payload.changeTaskTitle
                    }
                    : t)
        },
        changeTaskStatus(state, action: PayloadAction<{
            todoListId: string,
            taskId: string,
            changeTaskStatus: TaskStatuses
        }>) {
            state[action.payload.todoListId].map(t =>
                t.todoListId === action.payload.todoListId
                    ? {
                        ...t,
                        status: action.payload.changeTaskStatus
                    }
                    : t)
        },
        addTodoList(state, action: PayloadAction<{}>) {

        },
        removeTodoList(state, action: PayloadAction<{}>) {

        },
        setTodoLists(state, action: PayloadAction<{}>) {

        },
    }
})

export const tasksReducer = slice.reducer
export const {} = slice.actions
export const tasksReducer1 = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .filter(t => t.id !== action.taskId)
            }
        case 'ADD_TASK':
            return {
                ...state,
                [action.todoListId]: [{
                    id: v1(),
                    title: action.newTaskTitle,
                    status: TaskStatuses.New,
                    todoListId: action.todoListId,
                    description: '',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TodoTaskPriorities.Middle

                }, ...state[action.todoListId]]
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.todoListId]:
                    state[action.todoListId]
                        .map(t => t.id === action.taskId
                            ? {...t, title: action.changeTaskTitle}
                            : t)
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.todoListId]:
                    state[action.todoListId]
                        .map(t => t.id === action.taskId
                            ? {...t, status: action.changeTaskStatus}
                            : t)
            }
        case "REMOVE_TODOLIST":
            const copyTasks = {...state}
            delete copyTasks[action.todoListId]
            return copyTasks
        case 'ADD_TODOLIST':
            return {...state, [action.todoListId]: []}
        case 'SET_TODOLISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        default:
            return state
    }
}

type ActionsType =
    | RemoveTaskAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | ChangeTaskStatusAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT

//  ACTION TYPES
export type RemoveTaskAT = {
    type: 'REMOVE_TASK'
    todoListId: string
    taskId: string
}
export type AddTaskAT = {
    type: 'ADD_TASK'
    todoListId: string
    newTaskTitle: string
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE_TASK_TITLE'
    todoListId: string
    taskId: string
    changeTaskTitle: string
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE_TASK_STATUS'
    todoListId: string
    taskId: string
    changeTaskStatus: TaskStatuses
}

//  ACTION CREATORS
export const RemoveTaskAC = (todoListId: string, taskId: string): RemoveTaskAT => {
    return {type: 'REMOVE_TASK', todoListId, taskId}
}
export const AddTaskAC = (todoListId: string, newTaskTitle: string): AddTaskAT => {
    return {type: 'ADD_TASK', todoListId, newTaskTitle}
}
export const ChangeTaskTitleAC = (todoListId: string, taskId: string, changeTaskTitle: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE_TASK_TITLE', todoListId, taskId, changeTaskTitle}
}
export const ChangeTaskStatusAC = (todoListId: string, taskId: string, changeTaskStatus: TaskStatuses): ChangeTaskStatusAT => {
    return {type: 'CHANGE_TASK_STATUS', todoListId, taskId, changeTaskStatus}
}

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

export type TaskDomainType = TaskType