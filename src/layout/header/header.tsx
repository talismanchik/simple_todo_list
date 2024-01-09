import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch, useAppSelector} from "@/state/hooks/redux";
import {RequestStatusType} from "@/state/appReducer/appReducer";
import {logoutTC} from "@/state/authReducer/authReducer";

type HeaderType = {
    isLoggedIn: boolean
}
export const Header = ({isLoggedIn}: HeaderType) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <AppBar position={'static'} style={{height: '67px'}}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Todolist
                </Typography>
                {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
            </Toolbar>
                {status === 'loading' && <LinearProgress />}
        </AppBar>
    );
};

