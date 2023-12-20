import {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./AddItemForm.module.scss";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm = ({addItem}: AddItemFormType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title)
            setTitle('')

        } else {
            setError('Field is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }


    return (
        <div className={s.container}>
            <TextField variant={'outlined'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       error={!!error}
                       label={'title'}
                       helperText={error}/>
            <IconButton
                color={'primary'}
                onClick={addItemHandler}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

