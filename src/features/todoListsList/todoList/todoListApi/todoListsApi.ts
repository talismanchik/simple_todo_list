import {instance} from "@/common/api/baseApi";
import {BaseResponseType} from '@/common/types/commonTypes'


export const todoListsAPI = {
    getTodoLists: () => {
        return instance.get<TodoListType[]>(`todo-lists`)
    },
    createTodoList: (title: string) => {
        return instance.post<BaseResponseType<{item: TodoListType}>>(`todo-lists`, {title: title})
    },
    deleteTodoList: (todoListId: string) => {
        return instance.delete<BaseResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodoList: (arg: ArgUpdateTodoList) => {
        return instance.put<BaseResponseType<{item: TodoListType}>>(`todo-lists/${arg.todoListId}`, {title: arg.title})
    },
}

// TYPES
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ArgUpdateTodoList = {
    todoListId: string,
    title: string
}

