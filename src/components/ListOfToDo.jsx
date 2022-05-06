import React, { useContext } from 'react'
import { Store } from './StoreProvider'
import ToDoList from '../styles/ToDoList.css'

const ListOfToDo = ({ task }) => {

    const { state, dispatch } = useContext(Store)

    const onDelete = (task, category) => {
        dispatch({
            type: 'remove-task',
            payload: {
                task,
                category
            }
        })
    }



    return (
        <tr key={task}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>
                <button type="button" className="btn btn-primary btn-task" onClick={() => onEdit(task)}>Edit</button>
            </td>
            <td>
                <button type="button" className="btn btn-danger btn-task" onClick={() => onDelete(task, category)}>Delete</button>
            </td>
        </tr>
    )
}

export default ListOfToDo