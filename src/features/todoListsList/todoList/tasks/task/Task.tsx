import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/components/aditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {ChangeEvent, useCallback} from "react";
import {TaskDomainType} from "@/state/tasksReducer/tasksReducer";

import React from 'react'
import {TaskStatuses} from "@/api/tasksApi";



type TaskPropsType = {
    task: TaskDomainType
    changeStatus: (newIsDone: TaskStatuses) => void
    changeTaskTitle: (title: string) => void
    removeTask: () => void
    disabled: boolean
}
export const Task = React.memo(({
                         task,
                         changeStatus,
                         changeTaskTitle,
                         removeTask,
                         disabled,
                     }: TaskPropsType) => {

    const onCheckedChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        changeStatus(newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }

    return (
        <li>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      color={'primary'}
                      onChange={onCheckedChangeHandler}
                      disabled={disabled}
            />
            <EditableSpan isDone={task.status === TaskStatuses.Completed} title={task.title}
                          onChange={useCallback(changeTaskTitle, [])} disabled={disabled}/>
            <IconButton onClick={removeTask} disabled={disabled}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
});
