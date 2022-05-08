import React, { useContext, useState, useRef, useEffect } from 'react'
import { Store } from './StoreProvider'
import ListOfToDo from './ListOfToDo'
import categories from '../styles/categories.css'

const ListOfCategories = () => {

    const { state, dispatch } = useContext(Store)

    const [task, setTask] = useState('')

    const inputRef = useRef(null)

    const onDelete = async (category) => {
        let response = await fetch(`http://localhost:8081/api/delete/category/${category.id}`,
            {
                method: 'DELETE'
            })
        if (response.status === 200) {
            dispatch({
                type: 'remove-category',
                payload: category
            })
        }
    }

    const onAddTask = async (event, category) => {

        event.preventDefault()

        if (task) {

            const taskCreated = {
                title: task,
                done: false,
                fkCategory: category.id
            }

            let taskSavedPromise = await fetch(`http://localhost:8081/api/create/task`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(taskCreated)
                })

            let taskSaved = await taskSavedPromise.json()

            dispatch({
                type: 'add-task',
                payload: {
                    taskSaved,
                    category
                }
            })
            inputRef.current.reset()
        }
    }

    const addingTask = (e) => {
        setTask(e.target.value)
    }

    state.listOfCategories.map(category => console.log(category))


    return (
        <div>
            {state.listOfCategories?.map(category => {
                return <div className="card category-block" key={category}>
                    <div className="card-header category">
                        <div className='name-category'>
                            <h2>{category.name}</h2>
                        </div>
                        <br /><br />
                        <button type="button" className="btn btn-danger btn-tuning" onClick={() => onDelete(category)}>Delete</button>
                    </div>
                    <div className="form-floating mb-3 input-category">
                        <form ref={inputRef}>
                            <input type="text" className="form-control" id="floatingInput" placeholder="next task" onChange={addingTask} />
                            <label for="floatingInput">What is your next task?</label>
                            <button type="button" className="btn btn-success btn-tuning" onClick={(event) => { onAddTask(event, category) }}>Create</button>
                        </form>
                    </div>
                    <div className="card-body">
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
                                {category.listOfTasks?.map(task => {
                                    return <ListOfToDo key={category.id} task={task} categoryId={category.id} />
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ListOfCategories