import {FilterValuesType, todoListType} from "./App.tsx";
import s from './Todolist.module.scss'
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    todoList: todoListType
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    removeTodoList: (todoListId: string)=>void
}
export const TodoList = ({
                             todoList,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeStatus,
                             changeTaskTitle,
                             removeTodoList,
                         }: TodoListType) => {


    const onClickHandler = (title: string) => {
        addTask(title, todoList.id)
    }


    const tasksMapped = tasks.map((el) => {
        const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(el.id, title, todoList.id)
        }

        return (
            <li key={el.id}>
                <input type={'checkbox'}
                       checked={el.isDone}
                       onChange={() => changeStatus(el.id, !el.isDone, todoList.id)}/>
                {/*<span  className={el.isDone? s.isDone: ''}>{el.title}</span>*/}
                <EditableSpan title={el.title} onChange={changeTaskTitleHandler}/>
                <button onClick={() => removeTask(el.id, todoList.id)}>x</button>
            </li>
        )
    })

    return (
        <div className={s.todoListContainer}>
            <h3>{todoList.title}
                <button onClick={()=> removeTodoList(todoList.id)}>x</button>
            </h3>

            <AddItemForm addItem={onClickHandler}/>
            <ul>
                {tasksMapped}
            </ul>
            <div>
                <button className={todoList.filter === 'all' ? s.activeFilter : ''}
                        onClick={() => changeFilter('all', todoList.id)}>All
                </button>
                <button className={todoList.filter === 'active' ? s.activeFilter : ''}
                        onClick={() => changeFilter('active', todoList.id)}>Active
                </button>
                <button className={todoList.filter === 'completed' ? s.activeFilter : ''}
                        onClick={() => changeFilter('completed', todoList.id)}>Completed
                </button>
            </div>
        </div>
    )
}

