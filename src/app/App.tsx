import s from './App.module.scss'
import {Header} from "@/app/layout/header/header";
import Container from "@mui/material/Container";
import {useEffect} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from '@/features/auth/ui/login';
import CircularProgress from "@mui/material/CircularProgress";
import {TodoListsList} from "@/features/todoListsList/TodoListsList";
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {authThunks} from "@/features/auth/api/authReducer";
import {ErrorSnackbar} from "@/common/components/errorSnackbar/ErrorSnackbar";

export const App = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(authThunks.initializeApp())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className={s.app}>
                <ErrorSnackbar/>

                <Header isLoggedIn={isLoggedIn}/>
                <Container fixed style={{paddingBottom: '30px'}}>
                    <Routes>
                        <Route path={'/'} element={<TodoListsList isLoggedIn={isLoggedIn}/>}/>
                        <Route path={'/auth'} element={<Login isLoggedIn={isLoggedIn}/>}/>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                        <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>

    )
}