import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginFormSchema, LoginFormType} from "./loginFormSchema.ts";

export const Login = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema)
    })
    const onSubmit: SubmitHandler<LoginFormType> = (data) => {
        alert('date: ' + JSON.stringify(data))

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

//const emailRegex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/


//TYPES
