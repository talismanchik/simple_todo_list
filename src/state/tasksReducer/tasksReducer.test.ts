import {todolistID1, todolistID2} from "../todoListsReducer/todoListsReducer.test.ts";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasksReducer.ts";
import {TaskStatuses, TodoTaskPriorities} from "../../api/tasksApi.ts";


export const startTasksState :TasksStateType = {
    [todolistID1]: [
        {id: '11', title: 'CSS', status: TaskStatuses.Completed, addedDate: '', startDate: '', todoListId: todolistID1, deadline: '', description: '', order: 0, priority: TodoTaskPriorities.Middle},
        {id: '12', title: 'React', status: TaskStatuses.New, addedDate: '', startDate: '', todoListId: todolistID1, deadline: '', description: '', order: 0, priority: TodoTaskPriorities.Middle},
        {id: '13', title: 'TS', status: TaskStatuses.Completed, addedDate: '', startDate: '', todoListId: todolistID1, deadline: '', description: '', order: 0, priority: TodoTaskPriorities.Middle},
    ],
    [todolistID2]: [
        {id: '21', title: 'bread',status: TaskStatuses.Completed, addedDate: '', startDate: '', todoListId: todolistID2, deadline: '', description: '', order: 0, priority: TodoTaskPriorities.Middle},
        {id: '22', title: 'milk', status: TaskStatuses.New, addedDate: '', startDate: '', todoListId: todolistID2, deadline: '', description: '', order: 0, priority: TodoTaskPriorities.Middle},
        {id: '23', title: 'beef', status: TaskStatuses.Completed, addedDate: '', startDate: '', todoListId: todolistID2, deadline: '', description: '', order: 0, priority: TodoTaskPriorities.Middle},
        {id: '24', title: 'sugar', status: TaskStatuses.Completed, addedDate: '', startDate: '', todoListId: todolistID2, deadline: '', description: '', order: 0, priority: TodoTaskPriorities.Middle},
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
    const changeTaskStatus = TaskStatuses.New
    const action = ChangeTaskStatusAC(todolistID1, '11', changeTaskStatus)

    const endState: TasksStateType = tasksReducer(startTasksState, action)

    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID2].length).toBe(4)
    expect(endState[todolistID1][0].status).toBe(changeTaskStatus)
})
