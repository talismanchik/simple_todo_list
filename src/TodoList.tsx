import {FilterValuesType} from "./App.tsx";
import {ChangeEvent, useState} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}
export const TodoList = ({title, tasks, removeTask, changeFilter, addTask}: TodoListType) => {

    const [taskTitle, setTaskTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>
    ) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onClickHandler = ()=> {
        if (taskTitle !==''){
            addTask(taskTitle)
            setTaskTitle('')
        }
}


    const tasksMapped = tasks.map((el) => {
        return (
            <li key={el.id}>
                <input type={'checkbox'} checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={() => removeTask(el.id)}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={(e) => onChangeHandler(e)}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {tasksMapped}
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}