import s from "../Todolist.module.scss";
import {TaskStatuses} from "@/api/tasksApi";
import {Task} from "./task/Task";
import {TaskDomainType, UpdateDomainTaskModelType} from "@/state/tasksReducer/tasksReducer";
import {useAppSelector} from "@/state/hooks/redux";
import {TodoListDomainType} from "@/state/todoListsReducer/todoListsReducer";
import React from 'react'

type TasksPropsType = {
    todoList: TodoListDomainType
    removeTask: (todoListId: string, taskId: string) => void
    updateTask: (todoListId: string, taskId: string, changeElement: UpdateDomainTaskModelType) => void
}

export const Tasks = React.memo(({
                          updateTask,
                          removeTask,
                          todoList
                      }: TasksPropsType) => {
    const tasks: TaskDomainType[] = useAppSelector<TaskDomainType[]>(state => state.tasks[todoList.id])

    let tasksForTodolist: TaskDomainType[] = tasks
    if (todoList.filter === 'completed') {
        tasksForTodolist = tasks.filter(el => el.status == TaskStatuses.Completed)
    }
    if (todoList.filter === 'active') {
        tasksForTodolist = tasks.filter(el => el.status == TaskStatuses.New)
    }

    const tasksMapped = tasksForTodolist.map((el) => {
        const changeTaskTitleHandler = (title: string) => {
            updateTask(todoList.id, el.id, {title})
        }
        const changeStatusHandler = (newStatus: TaskStatuses) => {
            updateTask(todoList.id, el.id, {status: newStatus})
        }
        const removeTaskHandler = () => {
            removeTask(todoList.id, el.id)
        }
        return (
            <Task key={el.id}
                  task={el}
                  changeStatus={changeStatusHandler}
                  changeTaskTitle={changeTaskTitleHandler}
                  removeTask={removeTaskHandler}
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
