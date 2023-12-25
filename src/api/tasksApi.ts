import {instance} from "./todoListsApi.ts";

export const tasksAPI = {
    getTasks: (todoListId: string) => {
        return instance.get(`${todoListId}/tasks`)
    },
    createTasks: (todoListId: string, title: string) => {
        return instance.post(`${todoListId}/tasks`, {title: title})
    },
    deleteTasks: (todoListId: string, taskId: string) => {
        return instance.delete(`${todoListId}/tasks/${taskId}`)
    },
    updateTasks: (todoListId: string, taskId: string, model: UpdateTaskModelType) => {
        return instance.put(`${todoListId}/tasks/${taskId}`, model)
    },
}

//  TYPES

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
    todoListId: string
    description: string
    startDate: string | null
    deadline: string | null
    addedDate: string
    order: number
    priority: TodoTaskPriorities
}
export type GetTaskResponseType = {
    error: string | null,
    totalCount: number,
    items: TaskType[]
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}