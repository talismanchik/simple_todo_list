import s from './Todolist.module.scss'
import {AddItemForm} from "../../../components/addItemForm/AddItemForm.tsx";
import {EditableSpan} from "../../../components/aditableSpan/EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {
    FilterValuesType,
    TodoListDomainType
} from "../../../state/todoListsReducer/todoListsReducer.ts";
import {fetchTasksTC, UpdateDomainTaskModelType} from "../../../state/tasksReducer/tasksReducer.ts";
import React, {useCallback, useEffect} from "react";
import {useAppDispatch} from "../../../state/hooks/redux.ts";
import {Tasks} from "./tasks/Tasks.tsx";

type TodoListPropsType = {
    todoList: TodoListDomainType
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    updateTask: (todoListId: string, taskId: string, changeElement: UpdateDomainTaskModelType) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, value: string) => void
}
export const TodoList = React.memo(({
                                        todoList,
                                        removeTask,
                                        changeFilter,
                                        addTask,
                                        updateTask,
                                        removeTodoList,
                                        changeTodoListTitle,
                                    }: TodoListPropsType) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(todoList.id))
    }, [])

    const onClickHandler = useCallback((title: string) => {
        addTask(todoList.id, title)
    }, [addTask, todoList.id])
    const changeTodoListTitleHandler = useCallback((title: string) => {
        changeTodoListTitle(todoList.id, title)
    }, [todoList.id, changeTodoListTitle])

    return (
        <div className={s.todoListContainer}>
            <div className={s.header}>
                <h3>
                    <EditableSpan title={todoList.title} onChange={changeTodoListTitleHandler}/>
                    <IconButton onClick={() => removeTodoList(todoList.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={onClickHandler}/>
            </div>
            <Tasks todoList={todoList} removeTask={removeTask} updateTask={updateTask}/>
            <div className={s.buttonContainer}>
                <Button className={s.button}
                        onClick={useCallback(() => changeFilter(todoList.id, 'all'), [])}
                        variant={todoList.filter === 'all' ? 'contained' : 'text'}
                >All
                </Button>
                <Button className={s.button}
                        onClick={useCallback(() => changeFilter(todoList.id, 'active'), [])}
                        variant={todoList.filter === 'active' ? 'contained' : 'text'}
                >Active
                </Button>
                <Button className={s.button}
                        onClick={useCallback(() => changeFilter(todoList.id, 'completed'), [])}
                        variant={todoList.filter === 'completed' ? 'contained' : 'text'}
                >Completed
                </Button>
            </div>
        </div>
    )
})