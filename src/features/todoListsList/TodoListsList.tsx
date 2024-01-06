import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import {TodoList} from "./todoList/TodoList.tsx";
import {useAppDispatch, useAppSelector} from "../../state/hooks/redux.ts";
import {
    changeTodoListFilter, changeTodoListTitleTC,
    fetchTodoListsTC, FilterValuesType,
    removeTodoListsTC, TodoListDomainType
} from "../../state/todoListsReducer/todoListsReducer.ts";
import {useCallback, useEffect} from "react";
import {
    addTaskTC, removeTaskTC,
    UpdateDomainTaskModelType, updateTaskTC
} from "../../state/tasksReducer/tasksReducer.ts";

export const TodoListsList = () => {
    const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskTC(todoListId, taskId))
    }, [])
    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskTC(todoListId, title))
    }, [])
    const updateTask = useCallback((todoListId: string, taskId: string, changeElement: UpdateDomainTaskModelType) => {
        dispatch(updateTaskTC(todoListId, taskId, changeElement))
    }, [])
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListsTC(todoListId))
    }, [])
    const changeTodoListTitle = useCallback((todoListId: string, value: string) => {
        dispatch(changeTodoListTitleTC(todoListId, value))
    }, [])
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilter({todoListId, filter: value}))
    }, [])

    const mappedTodoLists = todoLists.map(tdl => {
        return <Grid item key={tdl.id}>
            <Paper style={{padding: '10px'}}>
                <TodoList
                    todoList={tdl}
                    removeTask={removeTask}
                    addTask={addTask}
                    updateTask={updateTask}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                    changeFilter={changeFilter}
                />
            </Paper>
        </Grid>
    })
    return (
        <Grid container spacing={3}>
            {mappedTodoLists}
        </Grid>
    );
};
