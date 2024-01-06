import s from './App.module.scss'
import {TodoList} from "./features/todoListsList/todoList/TodoList.tsx";
import {AddItemForm} from "./components/addItemForm/AddItemForm.tsx";
import {Header} from "./layout/header/header.tsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import {
    addTodoListsTC, changeTodoListFilter,
    changeTodoListTitleTC, fetchTodoListsTC,
    FilterValuesType, removeTodoListsTC,
    TodoListDomainType,
} from "./state/todoListsReducer/todoListsReducer.ts";
import {
    addTaskTC, removeTaskTC, UpdateDomainTaskModelType, updateTaskTC,
} from "./state/tasksReducer/tasksReducer.ts";
import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./state/hooks/redux.ts";


export const App = () => {


    const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskTC(todoListId, taskId))
    }, [])
    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskTC(todoListId, title))
    }, [])
    const updateTask = useCallback((todoListId: string, taskId: string, changeElement: UpdateDomainTaskModelType) => {
        dispatch(updateTaskTC(todoListId, taskId, changeElement))
    }, [])
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListsTC(todoListId))
    }, [])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListsTC(title))
    }, [])
    const changeTodoListTitle = useCallback((todoListId: string, value: string) => {
        dispatch(changeTodoListTitleTC(todoListId, value))
    }, [])
    const changeFilterF = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilter({todoListId, filter: value}))
    }, [])

    const mappedTodoLists = todoLists.map(tdl => {


        return <Grid item key={tdl.id}>
            <Paper style={{padding: '10px'}}>
                <TodoList
                    todoList={tdl}
                    removeTask={removeTask}
                    addTask={addTask}
                    updateTask={updateTask}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
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
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {mappedTodoLists}
                </Grid>
            </Container>
        </div>
    )
}


