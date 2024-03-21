import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {createTheme} from "@mui/material";

export const useApp = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    const customTheme = createTheme({
        palette: {primary: {main: '#414b6e'}, secondary: {main: '#5461a2'}, mode: 'dark'}
    })

    return {isLoggedIn, isInitialized, dispatch, customTheme}
}