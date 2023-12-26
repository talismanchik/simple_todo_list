import s from './App.module.scss'
import {TodoList} from "./TodoList.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {Header} from "./layout/header/header.tsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import {
    AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, fetchTodoListsTC,
    RemoveTodoListAC, TodoListDomainType,
} from "./state/todoListsReducer/todoListsReducer.ts";
import {
    AddTaskAC, ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC, TasksStateType,
} from "./state/tasksReducer/tasksReducer.ts";
import {useCallback, useEffect} from "react";
import {TaskStatuses} from "./api/tasksApi.ts";
import {useAppDispatch, useAppSelector} from "./state/hooks/redux.ts";


export type FilterValuesType = 'all' | 'completed' | 'active'


export const App = () => {


    const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
     dispatch(fetchTodoListsTC)
    }, [])

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todoListId, taskId))
    }, [])
    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(AddTaskAC(todoListId, title))
    }, [])
    const changeTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(ChangeTaskTitleAC(todoListId, taskId, title))
    }, [])
    const changeStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
        dispatch(ChangeTaskStatusAC(todoListId, taskId, status))
    }, [])
    const removeTodoList = useCallback((todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatch(action)
    }, [])
    const addTodoList = useCallback((title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
    }, [])
    const changeTodoListTitle = useCallback((todoListId: string, value: string) => {
        dispatch(ChangeTodoListTitleAC(todoListId, value))
    }, [])
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(ChangeTodoListFilterAC(todoListId, value))
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


