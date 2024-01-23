import s from './Todolist.module.scss'
import {TodoListDomainType} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import {tasksThunks} from "@/features/todoListsList/todoList/tasks/tasksApi/tasksReducer";
import React, {useEffect} from "react";
import {Tasks} from "./tasks/Tasks";
import {useAppDispatch} from "@/common/hooks";
import {FilterTasksButtons} from "@/features/todoListsList/todoList/filterTasksButtons/filterTasksButtons";
import {TodoListTitle} from "@/features/todoListsList/todoList/todoListTitle/todoListTitle";
import {AddItemForm} from "@/common/components/addItemForm/AddItemForm";

type Props = {
    todoList: TodoListDomainType
}
export const TodoList = React.memo(({todoList,}: Props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(tasksThunks.fetchTasks(todoList.id))
    }, []);
    const addTaskHandler = (title: string) => {
        dispatch(tasksThunks.addTask({todoListId: todoList.id, title}))
    }
    return (
        <div className={s.todoListContainer}>
           <TodoListTitle todoList={todoList}/>
            <AddItemForm addItem={addTaskHandler} disabled={todoList.entityStatus === 'loading'}/>
            <Tasks todoList={todoList}/>
            <div className={s.buttonContainer}>
                <FilterTasksButtons todoList={todoList}/>
            </div>
        </div>
    )
})
