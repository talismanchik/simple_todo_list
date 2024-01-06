import {instance} from "./todoListsApi.ts";
import {ResponseType} from './todoListsApi.ts'

export const tasksAPI = {
    getTasks: (todoListId: string) => {
        return instance.get<GetTaskResponseType>(`${todoListId}/tasks`)
    },
    createTasks: (todoListId: string, title: string) => {
        return instance.post<ResponseType<{item: TaskType }>>(`${todoListId}/tasks`, {title: title})
    },
    deleteTasks: (todoListId: string, taskId: string) => {
        return instance.delete<ResponseType>(`${todoListId}/tasks/${taskId}`)
    },
    updateTasks: (todoListId: string, taskId: string, model: UpdateTaskModelType) => {
        return instance.put<ResponseType>(`${todoListId}/tasks/${taskId}`, model)
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
    startDate: string
    deadline: string
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
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
}