import {FilterValuesType} from "../../App.tsx";


export const todoListsReducer = (state: TodoListType[], action: ActionsType)=> {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id != action.id)
        default:
            return state
    }
}

//ACTION TYPES
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}


// ACTION CREATORS
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}



type ActionsType = RemoveTodolistActionType

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}