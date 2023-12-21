import {todolistID1, todolistID2} from "../todoListsReducer/todoListsReducer.test.ts";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasksReducer.ts";


export const startTasksState = {
    [todolistID1]: [
        {id: '11', title: 'CSS', isDone: true},
        {id: '12', title: 'React', isDone: false},
        {id: '13', title: 'TS', isDone: true},
    ],
    [todolistID2]: [
        {id: '21', title: 'bread', isDone: true},
        {id: '22', title: 'milk', isDone: false},
        {id: '23', title: 'beef', isDone: true},
        {id: '24', title: 'sugar', isDone: true},
    ],
}

test('correct task should be removed', () => {
    const action = RemoveTaskAC(todolistID1, '12')

    const endState: TasksStateType = tasksReducer(startTasksState, action)
    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID2].length).toBe(4)
    expect(endState[todolistID1][1].title).toBe('TS')
})
test('correct task should be added', () => {
    const newTaskTitle = 'new Task'
    const action = AddTaskAC(todolistID1, newTaskTitle)

    const endState: TasksStateType = tasksReducer(startTasksState, action)

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID2].length).toBe(4)
    expect(endState[todolistID1][0].title).toBe(newTaskTitle)
})
test('correct task should change its name', () => {
    const changeTaskTitle = 'Change Task'
    const action = ChangeTaskTitleAC(todolistID1, '11', changeTaskTitle)

    const endState: TasksStateType = tasksReducer(startTasksState, action)

    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID2].length).toBe(4)
    expect(endState[todolistID1][0].title).toBe(changeTaskTitle)
})
test('correct task should change its status', () => {
    const changeTaskStatus = false
    const action = ChangeTaskStatusAC(todolistID1, '11', changeTaskStatus)

    const endState: TasksStateType = tasksReducer(startTasksState, action)

    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID2].length).toBe(4)
    expect(endState[todolistID1][0].isDone).toBe(changeTaskStatus)
})
