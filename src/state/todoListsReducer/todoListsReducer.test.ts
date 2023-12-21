
import {
    AddTodoListAC, ChangeTodolistFilterAC, ChangeTodolistFilterAT,
    ChangeTodolistTitleAC, ChangeTodolistTitleAT,
    RemoveTodolistAC,
    todoListsReducer,
    TodoListType
} from "./todoListsReducer.ts";
import {FilterValuesType} from "../../App.tsx";

export const todolistID1 = 'todolistID1';
export const todolistID2 = 'todolistID2';

const startState: TodoListType[] = [
    {id: todolistID1, title: "What to learn", filter: "all"},
    {id: todolistID2, title: "What to buy", filter: "all"}
]

test('correct todoList should be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodolistAC(todolistID1))

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
    const action: ChangeTodolistTitleAT = ChangeTodolistTitleAC(startState[1].id, newTodolistTitle)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const action: ChangeTodolistFilterAT = ChangeTodolistFilterAC(startState[1].id, newFilter)


    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})