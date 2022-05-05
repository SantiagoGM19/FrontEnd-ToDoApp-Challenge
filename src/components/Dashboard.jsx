import React, { useContext, useRef, useState } from 'react'
import dashboard from '../styles/dashboard.css'
import ListOfCategories from './ListOfCategories'
import { Store } from './StoreProvider'

const Dashboard = () => {

    const inputRef = useRef(null)

    const { state, dispatch } = useContext(Store)

    const [category, setCategory] = useState('')

    const onAddCategory = (event) => {
        event.preventDefault()
        if (category) {
            dispatch({
                type: 'add-category',
                payload: {
                    category
                }
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
                    <input onChange={addingCategory} type="email" className="form-control" id="floatingInput" placeholder='List of TO-DO'/>
                    <label for="floatingInput">List of TO-DO</label>
                    <button type="button" className="btn btn-success btn-category" onClick={onAddCategory}>New list</button>
                </div>
            </form>
            <ListOfCategories key={category}/>
        </div>
    )
}

export default Dashboard