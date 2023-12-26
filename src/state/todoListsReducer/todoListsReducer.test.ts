
import {
    AddTodoListAC, ChangeTodoListFilterAC, ChangeTodolistFilterAT,
    ChangeTodoListTitleAC, ChangeTodolistTitleAT,
    RemoveTodoListAC,
    todoListsReducer,
    TodoListDomainType
} from "./todoListsReducer.ts";
import {FilterValuesType} from "../../App.tsx";

export const todolistID1 = 'todolistID1';
export const todolistID2 = 'todolistID2';

const startState: TodoListDomainType[] = [
    {id: todolistID1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
    {id: todolistID2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
]

test('correct todoList should be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodoListAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
})
test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})
test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Title'
    const action: ChangeTodolistTitleAT = ChangeTodoListTitleAC(startState[1].id, newTodolistTitle)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const action: ChangeTodolistFilterAT = ChangeTodoListFilterAC(startState[1].id, newFilter)


    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})