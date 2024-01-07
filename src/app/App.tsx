import s from './App.module.scss'
import {Header} from "../layout/header/header.tsx";
import Container from "@mui/material/Container";
import {fetchTodoListsTC} from "../state/todoListsReducer/todoListsReducer.ts";
import {useEffect} from "react";
import {useAppDispatch} from "../state/hooks/redux.ts";
import {TodoListsList} from "../features/todoListsList/TodoListsList.tsx";
import {ErrorSnackbar} from "../components/errorSnackbar/errorSnackbar.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/login/login.tsx";

export const App = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    return (
        <BrowserRouter>
            <div className={s.app}>
                <ErrorSnackbar/>
                <Header/>

                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodoListsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                        <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>

    )
}
