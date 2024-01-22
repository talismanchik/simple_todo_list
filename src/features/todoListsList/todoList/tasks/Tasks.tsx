import s from "../Todolist.module.scss";
import {Task} from "./task/Task";
import {TaskDomainType} from "@/features/todoListsList/todoList/tasks/tasksApi/tasksReducer";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {TodoListDomainType} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import React from 'react'
import {TaskStatuses} from "@/common/enums/enums";

type Props = {
    todoList: TodoListDomainType
}

export const Tasks = React.memo(({todoList}: Props) => {
    const tasks: TaskDomainType[] = useAppSelector<TaskDomainType[]>(state => state.tasks[todoList.id])

    let tasksForTodolist: TaskDomainType[] = tasks
    if (todoList.filter === 'completed') {
        tasksForTodolist = tasks.filter(el => el.status == TaskStatuses.Completed)
    }
    if (todoList.filter === 'active') {
        tasksForTodolist = tasks.filter(el => el.status == TaskStatuses.New)
    }
    const tasksMapped = tasksForTodolist.map((el) => {
        return (
            <Task key={el.id}
                  task={el}
                  disabled={el.entityStatus === "loading"}
            />
        )
    })
    return (
        <ul className={s.listItems}>
            {tasksMapped}
        </ul>
    );
});
