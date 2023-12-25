import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "../todoListsReducer/todoListsReducer.ts";

const initialState: TasksStateType = {
    // 'todoListId1': [
    //         {id: v1(), title: 'CSS', isDone: true},
    //         {id: v1(), title: 'React', isDone: false},
    //         {id: v1(), title: 'TS', isDone: true},
    //     ],
    //     'todoListId2': [
    //         {id: v1(), title: 'bread', isDone: true},
    //         {id: v1(), title: 'milk', isDone: false},
    //         {id: v1(), title: 'beef', isDone: true},
    //         {id: v1(), title: 'sugar', isDone: true},
    //     ],
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
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
                    isDone: false
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
                            ? {...t, isDone: action.changeTaskStatus}
                            : t)
            }
        case "REMOVE_TODOLIST":
            const copyTasks = {...state}
            delete copyTasks[action.todoListId]
            return copyTasks
        case 'ADD_TODOLIST':
            return {...state, [action.todoListId]: []}
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
    changeTaskStatus: boolean
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
export const ChangeTaskStatusAC = (todoListId: string, taskId: string, changeTaskStatus: boolean): ChangeTaskStatusAT => {
    return {type: 'CHANGE_TASK_STATUS', todoListId, taskId, changeTaskStatus}
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}