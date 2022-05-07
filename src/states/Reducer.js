import ListOfCategories from "../components/ListOfCategories"

function reducer(state, action) {
    switch(action.type){
        case 'get-categories':
            const listOfCategories = [...action.payload]
            const newStateListOfCategories = listOfCategories.map(category => {
                return {id: category.id, name: category.name, listOfTasks: [...category.tasks]}
            })
            const newState = {...state, listOfCategories:newStateListOfCategories}
            return newState
        case 'add-category':
            const newCategory = action.payload
            const newListOfCategories = [...state.listOfCategories, newCategory]
            const newSateOfCategories = {...state, listOfCategories: newListOfCategories}
            return newSateOfCategories
        case 'remove-category':
            const newListOfCategoriesWithoutPayloadCategory = state.listOfCategories.filter(category => category.id !== action.payload.id)
            const newStateWithCategoryDeleted = {...state, listOfCategories: newListOfCategoriesWithoutPayloadCategory}
            return newStateWithCategoryDeleted
        case 'add-task':
            const newTask = {
                id: Math.floor(Math.random()*100),
                title: action.payload.task,
                done: false
            }
            const thisCategory = state.listOfCategories.map(category => {
                if(category.id === action.payload.category.id){
                    return category
                }
            }).filter(category => category !== undefined)
            const listOfTaskOfThisCategory = [...thisCategory[0].listOfTasks]
            const newListOfTask = [...listOfTaskOfThisCategory, newTask]
            const newStateOfCategory = {...thisCategory[0], listOfTasks: newListOfTask}
            const newListOfCategoriesWithNewTask = [...state.listOfCategories.filter(category => category.id !== action.payload.category.id), newStateOfCategory]
            const newStateOfCategoriesWithNewCategoryTask = {...state, listOfCategories: newListOfCategoriesWithNewTask}
            return newStateOfCategoriesWithNewCategoryTask
    }
}

export default reducer