import {v1} from "uuid";
import {RemoveTodolistAC, todoListsReducer, TodoListType} from "./todoListsReducer.ts";

test('correct todoList should be removed', ()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodoListType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

