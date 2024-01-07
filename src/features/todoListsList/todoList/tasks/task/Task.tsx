import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../components/aditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {ChangeEvent, useCallback} from "react";
import {TaskDomainType} from "../../../../../state/tasksReducer/tasksReducer.ts";
import {TaskStatuses} from "../../../../../api/tasksApi.ts";
import React from 'react'



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
