import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {RequestStatusType} from "@/app/appReducer";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {authThunks} from "@/features/auth/api/authReducer";

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

