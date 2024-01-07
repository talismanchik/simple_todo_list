import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

export const Login = () => {
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
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

                        <TextField label={'Email:'} margin={'normal'}/>
                        Password:
                        <TextField label={'Password:'} margin={'normal'} type={'password'}/>
                    </FormGroup>
                    <FormControlLabel label={'Remember me'} control={<Checkbox/>}/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormControl>
            </Grid>
        </Grid>
    );
};

