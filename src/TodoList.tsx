import {FilterValuesType, TodoListType} from "./App.tsx";
import s from './Todolist.module.scss'
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from "@mui/material/Checkbox";

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
    removeTodoList: (todoListId: string) => void
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
                <Checkbox checked={el.isDone}
                color={'primary'}
                          onChange={() => changeStatus(el.id, !el.isDone, todoList.id)}
                />
                <EditableSpan isDone={el.isDone} title={el.title} onChange={changeTaskTitleHandler}/>
                <IconButton onClick={() => removeTask(el.id, todoList.id)}>
                    <DeleteIcon/>
                </IconButton>
                {/*<button onClick={() => removeTask(el.id, todoList.id)}>x</button>*/}
            </li>
        )
    })

    return (
        <div className={s.todoListContainer}>
            <div className={s.header}>
                <h3>
                    {todoList.title}
                    <IconButton onClick={() => removeTodoList(todoList.id)}>
                        <DeleteIcon/>
                    </IconButton>
                    {/*<button onClick={()=> removeTodoList(todoList.id)}>x</button>*/}
                </h3>
                <AddItemForm addItem={onClickHandler}/>
            </div>

            <ul className={s.listItems}>
                {tasksMapped}
            </ul>
            <div className={s.buttonContainer}>
                <Button className={s.button}
                        onClick={() => changeFilter('all', todoList.id)}
                        variant={todoList.filter === 'all' ? 'contained' : 'text'}
                >All
                </Button>
                <Button className={s.button}
                        onClick={() => changeFilter('active', todoList.id)}
                        variant={todoList.filter === 'active' ? 'contained' : 'text'}
                >Active
                </Button>
                <Button className={s.button}
                        onClick={() => changeFilter('completed', todoList.id)}
                        variant={todoList.filter === 'completed' ? 'contained' : 'text'}
                >Completed
                </Button>
            </div>
        </div>
    )
}

