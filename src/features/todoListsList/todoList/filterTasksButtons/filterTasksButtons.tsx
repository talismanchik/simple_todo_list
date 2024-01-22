import Button from "@mui/material/Button";
import s from "@/features/todoListsList/todoList/Todolist.module.scss";
import {
    changeTodoListFilter,
    FilterValuesType,
    TodoListDomainType
} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import {useAppDispatch} from "@/common/hooks";

type Props = {
    todoList: TodoListDomainType
}
export const FilterTasksButtons = ({todoList}: Props) => {
    const dispatch = useAppDispatch()
    const changeTodoListFilterHandler = (filter: FilterValuesType) => {
        dispatch(changeTodoListFilter({todoListId: todoList.id, filter}))
    }
    return (
        <>
            <Button className={s.button}
                    onClick={() => changeTodoListFilterHandler('all')}
                    variant={todoList.filter === 'all' ? 'contained' : 'text'}
            >All
            </Button>
            <Button className={s.button}
                    onClick={() => changeTodoListFilterHandler('active')}
                    variant={todoList.filter === 'active' ? 'contained' : 'text'}
            >Active
            </Button>
            <Button className={s.button}
                    onClick={() => changeTodoListFilterHandler('completed')}
                    variant={todoList.filter === 'completed' ? 'contained' : 'text'}
            >Completed
            </Button>
        </>
    );
};

