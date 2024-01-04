import s from './App.module.scss'
import {TodoList} from "./TodoList.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {Header} from "./layout/header/header.tsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import {
    addTodoList,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTodoList,
    setTodoLists,
    TodoListDomainType,
} from "./state/todoListsReducer/todoListsReducer.ts";
import {
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    removeTask,
    TasksStateType,
} from "./state/tasksReducer/tasksReducer.ts";
import {useCallback, useEffect} from "react";
import {TaskStatuses} from "./api/tasksApi.ts";
import {useAppDispatch, useAppSelector} from "./state/hooks/redux.ts";
import {TodoListType} from "./api/todoListsApi.ts";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'completed' | 'active'

export const startState: TodoListDomainType[] = [
    {id: 'todolistID1', title: "What to learn", filter: "all", order: 0, addedDate: ''},
    {id: 'todolistID2', title: "What to buy", filter: "all", order: 0, addedDate: ''}
]

export const App = () => {


    const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTodoLists({todoLists: startState}))
    }, [])

    const removeTaskF = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTask({todoListId, taskId}))
    }, [])
    const addTaskF = useCallback((todoListId: string, title: string) => {
        dispatch(addTask({todoListId, taskTitle: title}))
    }, [])
    const changeTaskTitleF = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitle({todoListId, taskId, changeTaskTitle: title}))
    }, [])
    const changeStatusF = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatus({todoListId, taskId, changeTaskStatus: status}))
    }, [])
    const removeTodoListF = useCallback((todoListId: string) => {
        dispatch(removeTodoList({todoListId}))
    }, [])
    const addTodoListF = useCallback((title: string) => {
        const list: TodoListType = {
            id: v1(),
            title: title,
            addedDate: '',
            order: 1
        }
        dispatch(addTodoList({todoList: list}))
    }, [])
    const changeTodoListTitleF = useCallback((todoListId: string, value: string) => {
        dispatch(changeTodoListTitle({todoListId, title: value}))
    }, [])
    const changeFilterF = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilter({todoListId, filter: value}))
    }, [])

    const mappedTodoLists = todoLists.map(tdl => {


        return <Grid item key={tdl.id}>
            <Paper style={{padding: '10px'}}>
                <TodoList
                    todoList={tdl}
                    tasks={tasks[tdl.id]}
                    removeTask={removeTaskF}
                    addTask={addTaskF}
                    changeTaskTitle={changeTaskTitleF}
                    changeStatus={changeStatusF}
                    removeTodoList={removeTodoListF}
                    changeTodoListTitle={changeTodoListTitleF}
                    changeFilter={changeFilterF}
                />
            </Paper>
        </Grid>
    })


    return (
        <div className={s.app}>
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoListF}/>
                </Grid>
                <Grid container spacing={3}>
                    {mappedTodoLists}
                </Grid>
            </Container>
        </div>
    )
}


