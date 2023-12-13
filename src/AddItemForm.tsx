import {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./Todolist.module.scss";

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
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>
    ) => {
        setError('')
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }


    return (
        <div>
            <input className={error && s.errorInput}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyPressHandler}/>
            <button onClick={addItemHandler}>+</button>
            {error && <div className={s.errorMassage}>{error}</div>}
        </div>
    );
};

