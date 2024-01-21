import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginFormSchema, LoginFormType} from "../model/loginFormSchema";
import {useAppDispatch} from "@/common/hooks";
import {Navigate} from "react-router-dom";
import {authThunks} from "@/features/auth/api/authReducer";


type LoginType = {
    isLoggedIn: boolean
}

export const Login = ({isLoggedIn}: LoginType) => {
    const dispatch = useAppDispatch()

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema)
    })
    const onSubmit: SubmitHandler<LoginFormType> = (data) => {
        dispatch(authThunks.login(data))
    }

    if(isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <label>Email:</label>
                            <TextField  {...register("email")}
                                        label={'Enter your email'}
                                        margin={'normal'}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}/>
                            <label>Password:</label>
                            <TextField  {...register("password")}
                                        label={'Enter your password'}
                                        margin={'normal'}
                                        type={'password'}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}/>
                        </FormGroup>
                        <FormControlLabel  {...register("rememberMe")}
                                           label={'Remember me'}
                                           control={<Checkbox/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};

