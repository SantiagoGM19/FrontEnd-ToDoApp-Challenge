import React, { useContext, useEffect, useRef, useState } from 'react'
import dashboard from '../styles/dashboard.css'
import ListOfCategories from './ListOfCategories'
import { Store } from './StoreProvider'

const Dashboard = () => {

    const inputRef = useRef(null)

    const { state, dispatch } = useContext(Store)

    const [category, setCategory] = useState('')

    useEffect(() => {
        let listOfCategories = fetchAllCategories().then(
            categories => {
                let action = {
                    type: "get-categories",
                    payload: categories
                }
                dispatch(action)
            }
        )
    }, [])

    const fetchAllCategories = async () => {
        let response = await fetch(`http://localhost:8081/api/get/categories`)
        let data = response.json()
        return data
    }

    const onAddCategory = async (event) => {
        event.preventDefault()
        if (category) {
            const categoryCreated = {
                'name': category
            }
            let categorySavedPromise = await fetch(`http://localhost:8081/api/create/category`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(categoryCreated)
            })
            let categorySaved = await categorySavedPromise.json()
            dispatch({
                type: 'add-category',
                payload: categorySaved
            })
            inputRef.current.reset()
        }
    }

    const addingCategory = (e) => {
        setCategory(e.target.value)
    }

    return (
        <div className='dashboard'>
            <form ref={inputRef}>
                <div className="form-floating mb-3 input-category" >
                    <input onChange={addingCategory} type="text" className="form-control" id="floatingInput" placeholder='List of TO-DO' />
                    <label for="floatingInput">List of TO-DO</label>
                    <button type="button" className="btn btn-success btn-category" onClick={onAddCategory}>New list</button>
                </div>
            </form>
            <ListOfCategories key={category} />
        </div>
    )
}

export default Dashboard