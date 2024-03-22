import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {createTheme} from "@mui/material";

export const useApp = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    const darkMode = useAppSelector<boolean>(state => state.app.isDarkMode)

    const customTheme = createTheme({
        palette: {primary: {main: '#3f55af'}, secondary: {main: '#5461a2'}, mode: darkMode ? 'dark' : 'light'}
    })

    return {isLoggedIn, isInitialized, dispatch, customTheme, darkMode}
}