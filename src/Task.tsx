import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {ChangeEvent, useCallback} from "react";
import {TaskDomainType} from "./state/tasksReducer/tasksReducer.ts";
import {TaskStatuses} from "./api/tasksApi.ts";


type TaskPropsType = {
    task: TaskDomainType
    changeStatus: (newIsDone: TaskStatuses) => void
    changeTaskTitle: (title: string) => void
    removeTask: () => void
}
export const Task = ({task, changeStatus, changeTaskTitle, removeTask}: TaskPropsType) => {

    const onCheckedChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        changeStatus(newIsDoneValue? TaskStatuses.Completed : TaskStatuses.New)
    }

    return (
        <li>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      color={'primary'}
                      onChange={onCheckedChangeHandler}
            />
            <EditableSpan isDone={task.status === TaskStatuses.Completed} title={task.title} onChange={useCallback(changeTaskTitle, [])}/>
            <IconButton onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
};

