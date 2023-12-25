import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useCallback} from "react";
import {TaskType} from "./state/tasksReducer/tasksReducer.ts";


type TaskPropsType = {
    task: TaskType
    changeStatus: (newIsDone: boolean) => void
    changeTaskTitle: (title: string) => void
    removeTask: () => void
}
export const Task = ({task, changeStatus, changeTaskTitle, removeTask}: TaskPropsType) => {

    return (
        <li>
            <Checkbox checked={task.isDone}
                      color={'primary'}
                      onChange={() => changeStatus(!task.isDone)}
            />
            <EditableSpan isDone={task.isDone} title={task.title} onChange={useCallback(changeTaskTitle, [])}/>
            <IconButton onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
};

