import s from './App.module.scss'
import {TodoList} from "./TodoList.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {Header} from "./layout/header/header.tsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import {
    AddTodoListAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC,
    RemoveTodolistAC, TodoListType,
} from "./state/todoListsReducer/todoListsReducer.ts";
import {
    AddTaskAC, ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC, TasksStateType,
} from "./state/tasksReducer/tasksReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store.ts";
import {useCallback} from "react";

export type FilterValuesType = 'all' | 'completed' | 'active'


export const App = () => {


    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todoListId, taskId))
    }, [])
    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(AddTaskAC(todoListId, title))
    }, [])
    const changeTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(ChangeTaskTitleAC(todoListId, taskId, title))
    }, [])
    const changeStatus = useCallback((todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todoListId, taskId, isDone))
    }, [])
    const removeTodoList = useCallback((todoListId: string) => {
        const action = RemoveTodolistAC(todoListId)
        dispatch(action)
    }, [])
    const addTodoList = useCallback((title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
    }, [])
    const changeTodoListTitle = useCallback((todoListId: string, value: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, value))
    }, [])
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(todoListId, value))
    }, [])

    const mappedTodoLists = todoLists.map(tdl => {


        return <Grid item key={tdl.id}>
            <Paper style={{padding: '10px'}}>
                <TodoList

                    todoList={tdl}
                    tasks={tasks[tdl.id]}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeTaskTitle={changeTaskTitle}
                    changeStatus={changeStatus}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                    changeFilter={changeFilter}
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


