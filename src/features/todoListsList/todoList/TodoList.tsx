import s from './Todolist.module.scss'
import {AddItemForm, EditableSpan} from "@/common/components";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {FilterValuesType, TodoListDomainType} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import {tasksThunks} from "@/features/todoListsList/todoList/tasks/tasksApi/tasksReducer";
import React, {useCallback, useEffect} from "react";
import {Tasks} from "./tasks/Tasks";
import {useAppDispatch} from "@/common/hooks";

type TodoListPropsType = {
    todoList: TodoListDomainType
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, value: string) => void
}
export const TodoList = React.memo(({
                                        todoList,
                                        changeFilter,
                                        addTask,
                                        removeTodoList,
                                        changeTodoListTitle,
                                    }: TodoListPropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(tasksThunks.fetchTasks(todoList.id))
    }, []);

    const addTaskHandler = useCallback((title: string) => {
        addTask(todoList.id, title)
    }, [addTask, todoList.id])
    const changeTodoListTitleHandler = useCallback((title: string) => {
        changeTodoListTitle(todoList.id, title)
    }, [todoList.id, changeTodoListTitle])

    return (
        <div className={s.todoListContainer}>
            <div className={s.header}>
                <h3>
                    <EditableSpan title={todoList.title} onChange={changeTodoListTitleHandler}
                                  disabled={todoList.entityStatus === 'loading'}/>
                    <IconButton onClick={() => removeTodoList(todoList.id)}
                                disabled={todoList.entityStatus === 'loading'}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskHandler} disabled={todoList.entityStatus === 'loading'}/>
            </div>
            <Tasks todoList={todoList}  />
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
