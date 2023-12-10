import s from './App.module.scss'
import {TaskType, TodoList} from "./TodoList.tsx";
import {useState} from "react";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'completed' | 'active'
function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'TS', isDone: true},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(el => el.id != id)
        setTasks(filteredTasks)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const addTask = (title: string) => {
        const newTask:TaskType = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(el => el.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(el => !el.isDone)
    }



    return (
        <div className={s.app}>
            <TodoList title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    )
}

export default App
