import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";


import React, {useCallback, useEffect} from "react";
import {tasksThunks} from "@/features/todoListsList/todoList/tasks/tasksApi/tasksReducer";

import {Navigate} from "react-router-dom";
import {TodoList} from "./todoList/TodoList";
import {
    changeTodoListFilter,
    FilterValuesType,
    TodoListDomainType,
    todoListThunks
} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import {AddItemForm} from "@/common/components";
import {useAppDispatch, useAppSelector} from "@/common/hooks";

type TodoListsListType = {
    isLoggedIn: boolean
}

export const TodoListsList = React.memo(({isLoggedIn}: TodoListsListType) => {
    const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(todoListThunks.fetchTodoLists())
    }, [])


    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(tasksThunks.addTask({todoListId, title}))
    }, [])
      const removeTodoList = useCallback((todoListId: string) => {
        dispatch(todoListThunks.removeTodoList(todoListId))
    }, [])
    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(todoListThunks.changeTodoListTitle({todoListId, title}))
    }, [])
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilter({todoListId, filter: value}))
    }, [])
    const addTodoList = useCallback((title: string) => {
        dispatch(todoListThunks.addTodoList(title))
    }, [])


    const mappedTodoLists = todoLists.map(tdl => {
        return <Grid item key={tdl.id}>
            <Paper style={{padding: '10px'}}>
                <TodoList
                    todoList={tdl}
                    addTask={addTask}
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
