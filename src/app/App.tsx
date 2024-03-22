import {Header} from "@/app/layout/header/header";
import Container from "@mui/material/Container";
import {useEffect} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from '@/features/auth/ui/login';
import CircularProgress from "@mui/material/CircularProgress";
import {TodoListsList} from "@/features/todoListsList/TodoListsList";
import {authThunks} from "@/features/auth/api/authReducer";
import {ErrorSnackbar} from "@/common/components/errorSnackbar/ErrorSnackbar";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useApp} from "@/app/hooks/useApp";

export const App = () => {
    const {isLoggedIn, isInitialized, dispatch, customTheme} = useApp()
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
            <ThemeProvider theme={customTheme}>
                <CssBaseline />
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
            </ThemeProvider>
        </BrowserRouter>

    )
}