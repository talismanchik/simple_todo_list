import {tasksReducer, TasksStateType} from "./tasksReducer/tasksReducer.ts";
import {AddTodoListAC, RemoveTodolistAC, todoListsReducer, TodoListType} from "./todoListsReducer/todoListsReducer.ts";
import {startTasksState} from "./tasksReducer/tasksReducer.test.ts";
import {todolistID1, todolistID2} from "./todoListsReducer/todoListsReducer.test.ts";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: TodoListType[] = []

    const action = AddTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)
})
test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = startTasksState

    const action = RemoveTodolistAC(todolistID2)

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistID2]).not.toBeDefined()
    expect(endState[todolistID1]).toBeDefined()
})