import {useState} from "react";
import {TodoListType} from "../api/todoListsApi.ts";
import {tasksAPI, UpdateTaskModelType} from "../api/tasksApi.ts";



export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<TodoListType[] | null>(null)
    const [todoListId, setTodoListId] = useState('')
    const onClickHandler = () => {
        tasksAPI.getTasks(todoListId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todoListId'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}/>
        <button onClick={onClickHandler}>Get todolists</button>
    </div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<TodoListType[] | null>(null)
    const [todoListId, setTodoListId] = useState('')
    const [title, setTitle] = useState('')
    const onClickHandler = () => {
        tasksAPI.createTasks(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todoListId'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}/>
        <input placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={onClickHandler}>Get todolists</button>
    </div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<TodoListType[] | null>(null)
    const [todoListId, setTodoListId] = useState('')
    const [taskId, setTaskId] = useState('')
    const onClickHandler = () => {
        tasksAPI.deleteTasks(todoListId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todoListId'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
        <button onClick={onClickHandler}>Get todolists</button>
    </div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<TodoListType[] | null>(null)
    const [todoListId, setTodoListId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')
    // const [status, setStatus] = useState(0)
    // const [priority, setPriority] = useState(0)
    // const [startDate, setStartDate] = useState('')
    // const [deadline, setDeadline] = useState('')
    const onClickHandler = () => {
        const task: UpdateTaskModelType = {
            title: title,
            description: '',
            status: 0,
            priority: 0,
            startDate: '',
            deadline: '',
        }
        //debugger
        tasksAPI.updateTasks('ecb2b4e8-e296-470c-9804-759e2e53a9dd', '694034d9-b823-4f0f-8c3e-a2e87c49c0e9', task)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todoListId'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
        <input placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        {/*<input placeholder={'description'} value={description} onChange={e => setDescription(e.currentTarget.value)}/>*/}
        {/*<input placeholder={'status'} value={status} type={'number'} onChange={e => setStatus(+e.currentTarget.value)}/>*/}
        {/*<input placeholder={'priority'} value={priority} type={'number'}*/}
        {/*       onChange={e => setPriority(+e.currentTarget.value)}/>*/}

        <button onClick={onClickHandler}>Get todolists</button>
    </div>
}