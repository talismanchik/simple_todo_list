import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bdb4b942-b3f2-464b-ac66-0924a79f31cf'
    }
})


export const todoListsAPI = {
    getTodoLists: () => {
        return instance.get<TodoListType[]>(``)
    },
    createTodoList: (title: string) => {
        return instance.post<ResponseType<{item: TodoListType}>>(``, {title: title})
    },
    deleteTodoList: (todoListId: string) => {
        return instance.delete<ResponseType>(`${todoListId}`)
    },
    updateTodoList: (todoListId: string, title: string) => {
        return instance.put<ResponseType<{item: TodoListType}>>(`${todoListId}`, {title: title})
    },
}

// TYPES
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}