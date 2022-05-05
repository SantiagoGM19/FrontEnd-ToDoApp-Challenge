import React, { useContext } from 'react'
import { Store } from './StoreProvider'
import ToDoList from '../styles/ToDoList.css'

const ListOfToDo = () => {

    const { state, dispatch } = useContext(Store)

    return (
        <div>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <td>ID</td>
                        <td>Task</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {state.listOfCategories.map(category => {
                        return category.listOfTasks.map(task => {
                            return <tr key={task}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>
                                    <button type="button" className="btn btn-primary btn-task" onClick={() => onEdit(task)}>Edit</button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger btn-task" onClick={() => onDelete(task)}>Delete</button>
                                </td>
                            </tr>
                        })
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListOfToDo