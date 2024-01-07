import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppSelector} from "../../state/hooks/redux.ts";
import {RequestStatusType} from "../../state/appReducer/appReducer.ts";

export const Header = () => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
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
                <Button color="inherit">Login</Button>
            </Toolbar>
                {status === 'loading' && <LinearProgress />}
        </AppBar>
    );
};

