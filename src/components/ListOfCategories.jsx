import React, { useContext } from 'react'
import { Store } from './StoreProvider'
import ListOfToDo from './ListOfToDo'

const ListOfCategories = () => {

    const { state, dispatch } = useContext(Store)

    return (
        <div>
            {state.listOfCategories.map(category => {
                return <div className="card" key={category}>
                    <div className="card-header">
                        {category.name}
                        <br /><br />
                        <div className="form-floating mb-3 input-category">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label for="floatingInput">What is your next task?</label>
                        </div>
                        <button type="button" className="btn btn-danger">Delete</button>
                    </div>
                    <div className="card-body">
                        <ListOfToDo key={category.name} />
                    </div>
                </div>
            })}
        </div>
    )
}

export default ListOfCategories