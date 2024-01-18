import {instance} from "@/common/api/baseApi";
import {ResponseType} from '@/common/types/commonTypes'


export const todoListsAPI = {
    getTodoLists: () => {
        return instance.get<TodoListType[]>(`todo-lists`)
    },
    createTodoList: (title: string) => {
        return instance.post<ResponseType<{item: TodoListType}>>(`todo-lists`, {title: title})
    },
    deleteTodoList: (todoListId: string) => {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodoList: (todoListId: string, title: string) => {
        return instance.put<ResponseType<{item: TodoListType}>>(`todo-lists/${todoListId}`, {title: title})
    },
}

// TYPES
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

