import {EditableSpan} from "@/common/components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodoListDomainType, todoListThunks} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import {useAppDispatch} from "@/common/hooks";

type Props = {
    todoList: TodoListDomainType
}
export const TodoListTitle = ({todoList}: Props) => {
    const dispatch = useAppDispatch()

    const removeTodoListHandler = () => {
        dispatch(todoListThunks.removeTodoList(todoList.id))
    }
    const changeTodoListTitleHandler = (title: string) => {
        dispatch(todoListThunks.changeTodoListTitle({todoListId: todoList.id, title}))
    }

    return (
        <h3>
            <EditableSpan title={todoList.title} onChange={changeTodoListTitleHandler}
                          disabled={todoList.entityStatus === 'loading'}/>
            <IconButton onClick={removeTodoListHandler}
                        disabled={todoList.entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </h3>
    );
};

