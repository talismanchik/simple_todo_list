import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent} from "react";
import {TaskDomainType, tasksThunks} from "@/features/todoListsList/todoList/tasks/tasksApi/tasksReducer";
import {TaskStatuses} from "@/common/enums/enums";
import {useAppDispatch} from "@/common/hooks";
import {EditableSpan} from "@/common/components/editableSpan/EditableSpan";

type Props = {
    task: TaskDomainType
    disabled: boolean
}
export const Task = React.memo(({task, disabled,}: Props) => {
    const dispatch = useAppDispatch()
    const removeTaskHandler = () => {
        dispatch(tasksThunks.removeTask({todoListId: task.todoListId, taskId: task.id}))
    }
    const changeTaskTitleHandler = (title: string) => {
        dispatch(tasksThunks.updateTask({todoListId: task.todoListId, taskId:task.id, model: {title}}))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        dispatch(tasksThunks.updateTask({todoListId: task.todoListId, taskId:task.id, model: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}}))
    }

    return (
        <li>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      color={'primary'}
                      onChange={changeTaskStatusHandler}
                      disabled={disabled}
            />
            <EditableSpan isDone={task.status === TaskStatuses.Completed} title={task.title}
                          onChange={changeTaskTitleHandler} disabled={disabled}/>
            <IconButton onClick={removeTaskHandler} disabled={disabled}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
});
