import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


type TaskType = {
    isDone: boolean
    title: string
    changeStatus: (newIsDone: boolean) => void
    changeTaskTitle: (title: string) => void
    removeTask: () => void
}
export const Task = ({isDone, title, changeStatus, changeTaskTitle, removeTask}: TaskType) => {

    return (
        <li>
            <Checkbox checked={isDone}
                      color={'primary'}
                      onChange={() => changeStatus(!isDone)}
            />
            <EditableSpan isDone={isDone} title={title} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
};

