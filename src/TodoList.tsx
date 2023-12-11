import {FilterValuesType} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './Todolist.module.scss'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}
export const TodoList = ({
                             title,
                             filter,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeStatus
                         }: TodoListType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>
    ) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle)
            setTaskTitle('')

        } else {
            setError('Field is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>
    ) => {
        setError('')
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }


    const tasksMapped = tasks.map((el) => {
        return (
            <li key={el.id}>
                <input type={'checkbox'}
                       checked={el.isDone}
                       onChange={() => changeStatus(el.id, !el.isDone)}/>
                <span  className={el.isDone? s.isDone: ''}>{el.title}</span>
                <button onClick={() => removeTask(el.id)}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error && s.errorInput}
                       value={taskTitle}
                       onKeyUp={onKeyPressHandler}
                       onChange={(e) => onChangeHandler(e)}/>
                <button onClick={onClickHandler}>+</button>
                {error && <div className={s.errorMassage}>{error}</div>}
            </div>
            <ul>
                {tasksMapped}
            </ul>
            <div>
                <button className={filter === 'all' ? s.activeFilter : ''} onClick={() => changeFilter('all')}>All
                </button>
                <button className={filter === 'active' ? s.activeFilter : ''}
                        onClick={() => changeFilter('active')}>Active
                </button>
                <button className={filter === 'completed' ? s.activeFilter : ''}
                        onClick={() => changeFilter('completed')}>Completed
                </button>
            </div>
        </div>
    )
}