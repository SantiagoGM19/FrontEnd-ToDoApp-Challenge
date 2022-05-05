import React, { useContext } from 'react'
import { Store } from './StoreProvider'
import ListOfToDo from './ListOfToDo'
import categories from '../styles/categories.css'

const ListOfCategories = () => {

    const { state, dispatch } = useContext(Store)

    return (
        <div>
            {state.listOfCategories.map(category => {
                return <div className="card category-block" key={category}>
                    <div className="card-header category">
                        <div className='name-category'>
                            <h2>{category.name}</h2>
                        </div>
                        <br /><br />
                        <button type="button" className="btn btn-danger btn-tuning">Delete</button>
                    </div>
                    <div className="form-floating mb-3 input-category">
                        <input type="text" className="form-control" id="floatingInput" placeholder="next task" />
                        <label for="floatingInput">What is your next task?</label>
                        <button type="button" className="btn btn-success btn-tuning">Create</button>
                    </div>
                    <div className="card-body">
                        <ListOfToDo key={category.id} />
                    </div>
                </div>
            })}
        </div>
    )
}

export default ListOfCategories