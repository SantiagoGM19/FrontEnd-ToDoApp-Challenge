function reducer(state, action) {
    switch(action.type){
        case 'add-category':
            const newCategory = {
                id: Math.floor(Math.random()*100),
                name: action.payload.category,
                listOfTasks:[]
            }
            const newListOfCategories = [...state.listOfCategories, newCategory]
            const newSateOfCategories = {...state, listOfCategories: newListOfCategories}
            return newSateOfCategories
    }
}

export default reducer