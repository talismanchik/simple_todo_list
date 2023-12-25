import {useState} from 'react'

import {ResponseType, todoListsAPI, TodoListType} from "../api/todoListsApi.ts";

export default {
    title: 'API/todoList'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<TodoListType[] | null>(null)
    const onClickHandler =() => {
        todoListsAPI.getTodoLists()
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
    <button onClick={onClickHandler}>Get todolists</button>
    </div>
}
export const CreateTodoList = () => {
    const [state, setState] = useState<ResponseType<{ item: TodoListType }> | null>(null)
    const [title, setTitle] = useState('')
    const onClickHandler = ()=>{
        todoListsAPI.createTodoList(title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
        <input placeholder={'title'} value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Create todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todoListId, setTodoListId] = useState('')

   const onClickHandler=() => {
        todoListsAPI.deleteTodoList(todoListId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={'todoListId'} value={todoListId} onChange={e=> setTodoListId(e.currentTarget.value)}/>
        <button onClick={onClickHandler}>Delete todolist</button>
    </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todoListId, setTodoListId] = useState('')
    const [title, setTitle] = useState('')

    const onClickHandler =() => {
        todoListsAPI.updateTodoList(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={'todoListId'} value={todoListId} onChange={e=> setTodoListId(e.currentTarget.value)}/>
        <input placeholder={'title'}  value={title} onChange={e=> setTitle(e.currentTarget.value)}/>
        <button onClick={onClickHandler}>Update todolist</button>
    </div></div>
}

