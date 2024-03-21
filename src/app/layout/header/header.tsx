import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {RequestStatusType} from "@/app/appReducer";
import {authThunks} from "@/features/auth/api/authReducer";
import {ThemeToggle} from "@/common/components/themeToggle/themeToggle";

type HeaderType = {
    isLoggedIn: boolean
}
export const Header = ({isLoggedIn}: HeaderType) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const logoutHandler = () => {
        dispatch(authThunks.logout())
    }

    return (
        <AppBar position={'static'} style={{height: '67px'}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Task Tracker
                </Typography>
                <ThemeToggle/>
                {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
            </Toolbar>
                {status === 'loading' && <LinearProgress />}
        </AppBar>
    );
};

