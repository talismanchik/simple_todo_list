import {
    changeTodoListFilter,
    FilterValuesType,
    TodoListDomainType,
    todoListsReducer,
    todoListThunks
} from "@/features/todoListsList/todoList/todoListApi/todoListsReducer";
import {TodoListType} from "@/features/todoListsList/todoList/todoListApi/todoListsApi";


export let todolistId1: string
export let todolistId2: string
export let startTodoListState: TodoListDomainType[]

beforeEach(() => {
    todolistId1 = 'todolistId1'
    todolistId2 = 'todolistId2'
    startTodoListState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: "succeeded"},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: "succeeded"}
    ]
})

test(`'removeTodoList reducer'. Correct todolist should be removed`, () => {
    const action = todoListThunks.removeTodoList.fulfilled({todoListId: todolistId1},'','')
    const endState = todoListsReducer(startTodoListState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test(`'addTodoList reducer'. Correct todolist should be added`, () => {
    const newTodolist: TodoListType = {
        id: 'dafadgasga',
        title: 'new list',
        addedDate: '',
        order: 0,
    }
    const action = todoListThunks.addTodoList.fulfilled({todoList: newTodolist}, '', '')
    const endState = todoListsReducer(startTodoListState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('new list')
})
test(`'changeTodoListTitle reducer'. Correct todolist should change its name`, () => {

    const newTodolistTitle = 'New Todolist'
    const action = todoListThunks.changeTodoListTitle.fulfilled({
        todoListId: todolistId2,
        title: newTodolistTitle
    }, '', {
        todoListId: todolistId2,
        title: newTodolistTitle
    })
    const endState = todoListsReducer(startTodoListState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test(`'changeTodoListFilter reducer'. Correct filter of todolist should be changed`, () => {

    const newFilter: FilterValuesType = 'completed'
    const action = changeTodoListFilter({todoListId: todolistId2, filter: newFilter})

    const endState = todoListsReducer(startTodoListState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test(`'setTodoLists reducer'. Todolist should be set to the state`, () => {

    const action = todoListThunks.fetchTodoLists.fulfilled({
        todoLists: [
            {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0},
            {id: 'todolistId2', title: 'What to buy', addedDate: '', order: 0}
        ]
    },'', undefined)

    const endState = todoListsReducer([], action)

    expect(endState.length).toBe(2)
})

