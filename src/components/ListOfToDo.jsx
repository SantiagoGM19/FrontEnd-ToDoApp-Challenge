import React, { useContext, useState } from 'react'
import { Store } from './StoreProvider'
import ToDoList from '../styles/ToDoList.css'
import { Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button } from 'reactstrap'

const ListOfToDo = ({ task, categoryId }) => {

    const { state, dispatch } = useContext(Store)
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false)
    const [form, setForm] = useState({})
    const [title, setTitle] = useState("")

    const onDelete = async (task, category) => {

        let response = await fetch(`http://localhost:8081/api/delete/task/${task.id}`,
            {
                method: 'DELETE'
            })
        if (response.status === 200) {
            dispatch({
                type: 'remove-task',
                payload: {
                    task
                },
                idCategory: categoryId
            })
        }
    }

    const showUpdateModal = (data) => {
        setModalUpdateOpen(true)
        setForm(data)
    }

    const closeUpdateModal = () => {
        setModalUpdateOpen(false)
    }

    const onEdit = (event, task) => {
        showUpdateModal(task)
    }

    const onEditTask = async (e) => {
        const taskWitInfoUpdated = {
            ...task,
            title: title
        }

        let taskUpdatePromise = await fetch(`http://localhost:8081/api/update/task`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(taskWitInfoUpdated)
            })

        let taskUpdated = await taskUpdatePromise.json()

        dispatch({
            type: 'update-task',
            payload: taskUpdated,
            idCategory: categoryId
        })
    }
    const addingTitlte = (e) => {
        setTitle(e.target.value)
    }



    return (
        <>
            <tr key={task}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>
                    <button type="button" className="btn btn-primary btn-task" onClick={(event) => onEdit(event, task)}>Edit</button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger btn-task" onClick={() => onDelete(task)}>Delete</button>
                </td>
            </tr>
            <Modal isOpen={modalUpdateOpen}>
                <ModalHeader>
                    <div><h3>Edit task</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>title</label>
                        <input type="text" className='form-control' onChange={addingTitlte} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-success" onClick={() => onEditTask()}>Edit</Button>
                    <Button className="btn btn-danger" onClick={() => closeUpdateModal()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ListOfToDo