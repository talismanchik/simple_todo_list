import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import {Navigate} from "react-router-dom";
import {TodoList} from "./todoList/TodoList";
import {TodoListDomainType, todoListThunks} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import {AddItemForm} from "@/common/components";
import {useAppDispatch, useAppSelector} from "@/common/hooks";

type Props = {
    isLoggedIn: boolean
}

export const TodoListsList = React.memo(({isLoggedIn}: Props) => {
    const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(todoListThunks.fetchTodoLists())
    }, [])
    const addTodoList = useCallback((title: string) => {
        dispatch(todoListThunks.addTodoList(title))
    }, [])
    const mappedTodoLists = todoLists.map(tdl => {
        return <Grid item key={tdl.id}>
            <Paper style={{padding: '20px'}}>
                <TodoList todoList={tdl}/>
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
