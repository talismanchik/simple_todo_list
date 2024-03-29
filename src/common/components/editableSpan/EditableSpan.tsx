import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './EditableSpan.module.scss'
import TextField from "@mui/material/TextField";

type EditableSpanType = {
    title: string
    onChange: (title: string)=> void
    isDone?: boolean
    disabled: boolean
}

export const EditableSpan = React.memo(({title, onChange, isDone, disabled}:EditableSpanType) => {

    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(title)


    const activateEditeMode = ()=> {
        !disabled &&  setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
        onChange(inputValue)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(event.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return (
       editMode
           ? <TextField
                        variant={'outlined'}
                        value={inputValue}
                        onBlur={activateViewMode}
                        onChange={onChangeHandler}
                        autoFocus
                        onKeyUp={onKeyPressHandler}
           />
           :<span title={title.length >=26? title: ''}  className={isDone? s.isDone: ''} onDoubleClick={activateEditeMode}>{title}</span>
    );
});

