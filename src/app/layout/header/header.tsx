import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {RequestStatusType, setDarkAppMode} from "@/app/appReducer";
import {authThunks} from "@/features/auth/api/authReducer";
import {ThemeToggle} from "@/common/components/themeToggle/themeToggle";
import {useApp} from "@/app/hooks/useApp";

type HeaderType = {
    isLoggedIn: boolean
}
export const Header = ({isLoggedIn}: HeaderType) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    const { darkMode} = useApp()
    const logoutHandler = () => {
        dispatch(authThunks.logout())
    }

    const changeTheme = (mode: boolean) => {
       dispatch(setDarkAppMode({mode}))
    }

    return (
        <AppBar position={'static'} style={{height: '67px'}}>
            <Toolbar style={{gap: '20px'}}>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Task Tracker
                </Typography>
                <ThemeToggle darkMode={darkMode} setDarkMode={changeTheme}/>
                {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    );
};

