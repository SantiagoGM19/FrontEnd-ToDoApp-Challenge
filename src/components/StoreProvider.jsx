import React, { createContext, useReducer } from 'react'
import reducer from '../states/Reducer'

const initialState = {
    category:{
        id:'',
        name:''
    },
    listOfCategories: [
        {

            task: {
                id: '',
                title: '',
                done: false
            },
            listOfTasks: [
                {
                    id: '0',
                    title: 'Title by default',
                    done: true
                }
            ]
        }
    ]
}

const Store = createContext(initialState)

const StoreProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Store.Provider value={{ state, dispatch }}>
            {children}
        </Store.Provider>
    )
}

export default StoreProvider

export { Store, initialState }