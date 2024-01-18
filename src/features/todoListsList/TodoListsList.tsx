import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";


import React, {useCallback, useEffect} from "react";
import {tasksThunks, UpdateDomainTaskModelType} from "@/features/todoListsList/todoList/tasks/tasksReducer";

import {Navigate} from "react-router-dom";
import {TodoList} from "./todoList/TodoList";
import {
    addTodoListsTC,
    changeTodoListFilter,
    changeTodoListTitleTC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodoListsTC,
    TodoListDomainType
} from "@/features/todoListsList/todoList/todoListsReducer";
import {AddItemForm} from "@/common/components/addItemForm/AddItemForm";
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppSelector";

type TodoListsListType = {
    isLoggedIn: boolean
}

export const TodoListsList = React.memo(({isLoggedIn}: TodoListsListType) => {
    const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(tasksThunks.removeTask({todoListId, taskId}))
    }, [])
    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(tasksThunks.addTask({todoListId, title}))
    }, [])
    const updateTask = useCallback((todoListId: string, taskId: string, changeElement: UpdateDomainTaskModelType) => {
        dispatch(tasksThunks.updateTask({todoListId, taskId, model: changeElement}))
    }, [])
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListsTC(todoListId))
    }, [])
    const changeTodoListTitle = useCallback((todoListId: string, value: string) => {
        dispatch(changeTodoListTitleTC(todoListId, value))
    }, [])
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilter({todoListId, filter: value}))
    }, [])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListsTC(title))
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
                    changeFilter={changeFilter}
                />
            </Paper>
        </Grid>
    })
    if (!isLoggedIn) {
        return <Navigate to={'/auth'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {mappedTodoLists}
            </Grid>
        </>

    );
});
