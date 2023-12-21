import {FilterValuesType} from "./App.tsx";
import s from './Todolist.module.scss'
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from "@mui/material/Checkbox";
import {TodoListType} from "./state/todoListsReducer/todoListsReducer.ts";
import {TaskType} from "./state/tasksReducer/tasksReducer.ts";


type TodoListPropsType = {
    todoList: TodoListType
    tasks: TaskType[]
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, value: string) => void
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
                             changeTodoListTitle,
                         }: TodoListPropsType) => {


    const onClickHandler = (title: string) => {
        addTask(todoList.id, title)
    }
    const changeTodoListTitleHandler = (title: string)=>{
        changeTodoListTitle(todoList.id, title)
    }


    const tasksMapped = tasks.map((el) => {
        const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(todoList.id, el.id, title)
        }

        return (
            <li key={el.id}>
                <Checkbox checked={el.isDone}
                          color={'primary'}
                          onChange={() => changeStatus(todoList.id, el.id, !el.isDone)}
                />
                <EditableSpan isDone={el.isDone} title={el.title} onChange={changeTaskTitleHandler}/>
                <IconButton onClick={() => removeTask(todoList.id, el.id)}>
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
                    <EditableSpan title={todoList.title} onChange={changeTodoListTitleHandler}/>
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
                        onClick={() => changeFilter(todoList.id, 'all')}
                        variant={todoList.filter === 'all' ? 'contained' : 'text'}
                >All
                </Button>
                <Button className={s.button}
                        onClick={() => changeFilter(todoList.id, 'active')}
                        variant={todoList.filter === 'active' ? 'contained' : 'text'}
                >Active
                </Button>
                <Button className={s.button}
                        onClick={() => changeFilter(todoList.id, 'completed')}
                        variant={todoList.filter === 'completed' ? 'contained' : 'text'}
                >Completed
                </Button>
            </div>
        </div>
    )
}

