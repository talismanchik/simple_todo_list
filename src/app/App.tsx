import s from './App.module.scss'
import {AddItemForm} from "../components/addItemForm/AddItemForm.tsx";
import {Header} from "../layout/header/header.tsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {addTodoListsTC, fetchTodoListsTC} from "../state/todoListsReducer/todoListsReducer.ts";
import {useCallback, useEffect} from "react";
import {useAppDispatch} from "../state/hooks/redux.ts";
import {TodoListsList} from "../features/todoListsList/TodoListsList.tsx";

export const App = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListsTC(title))
    }, [])

    return (
        <div className={s.app}>
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <TodoListsList/>
            </Container>
        </div>
    )
}
