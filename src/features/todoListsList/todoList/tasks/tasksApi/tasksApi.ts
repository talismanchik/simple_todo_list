import { instance } from '@/common/api/baseApi';
import {BaseResponseType} from '@/common/types/commonTypes'
import {UpdateDomainTaskModelType} from "@/features/todoListsList/todoList/tasks/tasksApi/tasksReducer";
import {TaskStatuses, TodoTaskPriorities} from "@/common/enums/enums";

export const tasksAPI = {
    getTasks: (todoListId: string) => {
        return instance.get<GetTaskResponseType>(`todo-lists/${todoListId}/tasks`)
    },
    createTasks: (arg: ArgAddTask) => {
        return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${arg.todoListId}/tasks`, {title: arg.title})
    },
    deleteTasks: (arg: ArgRemoveTask) => {
        return instance.delete<BaseResponseType>(`todo-lists/${arg.todoListId}/tasks/${arg.taskId}`)
    },
    updateTasks: (arg: ArgUpdateTask) => {
        return instance.put<BaseResponseType>(`todo-lists/${arg.todoListId}/tasks/${arg.taskId}`, arg.model)
    },
}

//  TYPES
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

export type ArgAddTask = {
    todoListId: string
    title: string
}
export type ArgUpdateTask = {
    todoListId: string
    taskId: string
    model: UpdateDomainTaskModelType
}
export type ArgRemoveTask = {
    todoListId: string
    taskId: string
}
