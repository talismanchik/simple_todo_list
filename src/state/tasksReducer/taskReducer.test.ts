import {
    addTask,
    fetchTasks,
    removeTaskTC,
    tasksReducer,
    TasksStateType, updateTask
} from "./tasksReducer.ts";
import {TaskStatuses, TodoTaskPriorities} from "../../api/tasksApi.ts";
import {addTodoList, removeTodoList, setTodoLists} from "../todoListsReducer/todoListsReducer.ts";


let startTaskState: TasksStateType
beforeEach(() => {
    startTaskState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                // entityStatus: "idle"
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                // entityStatus: "idle"
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                // entityStatus: "idle"
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                // entityStatus: "idle"
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                // entityStatus: "idle"
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                // entityStatus: "idle"
            }
        ]
    }
})
test(`'removeTask reducer'. Correct task should be deleted from correct array`, () => {


    const action = removeTaskTC({todoListId: 'todolistId2', taskId: '2'})

    const endState = tasksReducer(startTaskState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                // entityStatus: "idle"
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                // entityStatus: "idle"
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                // entityStatus: "idle"
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                // entityStatus: "idle"
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                // entityStatus: "idle"
            }
        ]
    })
})
test(`'addTask reducer'. Correct task should be added to correct array`, () => {
    const title = 'new title'
    const action = addTask({

        task: {
            todoListId: 'todolistId2',
            title: title,
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            id: '25'
        }
    })

    const endState = tasksReducer(startTaskState, action)

    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe(title)
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
})
test(`'updateTask reducer'. Status of specified task should be changed`, () => {

    const action = updateTask({
        todoListId: 'todolistId1',
        taskId: '1',
        model: {status: TaskStatuses.Completed}})

    const endState = tasksReducer(startTaskState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.Completed)
})
test(`'updateTask reducer'. Title of specified task should be changed`, () => {

    const newTitle = 'new title'
    const action = updateTask({
        todoListId: 'todolistId1',
        taskId: '1',
        model: {title: newTitle}})
    const endState = tasksReducer(startTaskState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe(newTitle)
})
test('tasks should be added for todoList', () => {

    // const action = setTasksAC({listID: 'todolistId1', tasks: startState['todolistId1']})
    const action = fetchTasks({todoListId: 'todolistId1', tasks: startTaskState['todolistId1']})

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState['todolistId2'].length).toBe(0)
    expect(endState['todolistId1'].length).toBe(3)
})
// test('entityStatus should be added for todoList', () => {
//
//     const action = changeTaskEntityStatusAC({listID: 'todolistId1', taskID: '1', status: 'succeeded'})
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId1'][0].entityStatus).toBe('succeeded')
//     expect(endState['todolistId1'][1].entityStatus).toBe('idle')
//
// })
test(`'addTodoList reducer'. Ids should be equals`, () => {

    const action = addTodoList({todoList: {
            id: 'sfagsdhnsnc',
            title: 'New List',
            addedDate: '',
            order: 0
        }})

    const endTasksState = tasksReducer(startTaskState, action)


    const keys = Object.keys(endTasksState)
    const idFromTasks = keys.find(el=> el === action.payload.todoList.id)

    expect(keys.length).toBe(3)
    expect(idFromTasks).toBe(action.payload.todoList.id)
})
test('property with todolistId should be deleted', () => {

    const action = removeTodoList({todoListId: 'todolistId2'})


    const endState = tasksReducer(startTaskState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
test(`'setTodoLists reducer'. Tasks should be set to the state`, () => {

    const action = setTodoLists({todoLists: [
            {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0},
            {id: 'todolistId2', title: 'What to buy', addedDate: '', order: 0}
        ]})

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['todolistId1']).toStrictEqual([])
    expect(endState['todolistId2']).toStrictEqual([])
})


