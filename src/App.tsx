import s from './App.module.scss'
import {TaskType, TodoList} from "./TodoList.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";
import {Header} from "./layout/header/header.tsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";

export type FilterValuesType = 'all' | 'completed' | 'active'
export type todoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {

    const todoListId1 = v1()
    const todoListId2 = v1()


    const [todoLists, setTodoLists] = useState<todoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'TS', isDone: true},
        ],
        [todoListId2]: [
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'beef', isDone: true},
            {id: v1(), title: 'sugar', isDone: true},
        ],
    })

    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].filter(el => el.id != taskId)
        })
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(td => td.id != todoListId))
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }
    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        setTodoLists(
            [...todoLists
                .map(tdl => tdl.id === todoListId
                    ? {...tdl, filter: value}
                    : tdl)])
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, title} : el)})
    }
    const addTodoList = (title: string) => {
        const id = v1()
        setTodoLists([...todoLists, {id, title, filter: 'all'}])
        setTasks({...tasks, [id]: []})
    }

    const mappedTodoLists = todoLists.map(tdl => {
        let tasksForTodolist = tasks[tdl.id]
        if (tdl.filter === 'completed') {
            tasksForTodolist = tasks[tdl.id].filter(el => el.isDone)
        }
        if (tdl.filter === 'active') {
            tasksForTodolist = tasks[tdl.id].filter(el => !el.isDone)
        }

        return <Grid item>
            <Paper style={{padding: '10px'}}>
                <TodoList
                    key={tdl.id}
                    todoList={tdl}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    removeTodoList={removeTodoList}
                />
            </Paper>
        </Grid>
    })


    return (
        <div className={s.app}>
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/></Grid>
                <Grid container spacing={3}>
                    {mappedTodoLists}
                </Grid>
            </Container>
        </div>
    )
}


