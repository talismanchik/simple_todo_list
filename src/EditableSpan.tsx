import {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    onChange: (newTitle: string)=> void
}

export const EditableSpan = ({title, onChange}:EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(title)


    const activateEditeMode = ()=> {
        setEditMode(true)
    }

    const activateViewMode = () => {
        setEditMode(false)
        onChange(inputValue)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(event.currentTarget.value)
    }

    return (
       editMode
           ?<input value={inputValue} onBlur={activateViewMode} autoFocus onChange={onChangeHandler}/>
           :<span onDoubleClick={activateEditeMode}>{title}</span>
    );
};

