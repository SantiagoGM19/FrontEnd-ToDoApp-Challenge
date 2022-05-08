import ListOfCategories from "../components/ListOfCategories"

function reducer(state, action) {
    switch (action.type) {
        case 'get-categories':
            const listOfCategories = [...action.payload]
            const newStateListOfCategories = listOfCategories.map(category => {
                return { id: category.id, name: category.name, listOfTasks: [...category.tasks] }
            })
            const newState = { ...state, listOfCategories: newStateListOfCategories }
            return newState

        case 'add-category':
            const newCategory = action.payload
            const newListOfCategories = [...state.listOfCategories, newCategory]
            const newSateOfCategories = { ...state, listOfCategories: newListOfCategories }
            return newSateOfCategories

        case 'remove-category':
            const newListOfCategoriesWithoutPayloadCategory = state.listOfCategories.filter(category => category.id !== action.payload.id)
            const newStateWithCategoryDeleted = { ...state, listOfCategories: newListOfCategoriesWithoutPayloadCategory }
            return newStateWithCategoryDeleted

        case 'add-task':
            const newTask = action.payload.taskSaved
            const newListOfCategoriesWithNewTask = state.listOfCategories.map(category => {
                if (category.id === action.payload.category.id) {
                    const listOfTaskOfThisCategory = [...category.listOfTasks]
                    const newListOfTasks = [...listOfTaskOfThisCategory, newTask]
                    const newStateOfCategory = {...category, listOfTasks: newListOfTasks}
                    return newStateOfCategory
                }
                return category
            })
            const newStateOfCategoriesWithNewCategoryTask = { ...state, listOfCategories: newListOfCategoriesWithNewTask }
            return newStateOfCategoriesWithNewCategoryTask

        case 'update-task':
            const newListCategories = state.listOfCategories.map(category => {
                if (category.id === action.idCategory) {
                    const newListOfTasksUpdated = category.listOfTasks.map(task => {
                        if(task.id === action.payload.id){
                            return action.payload
                        }
                        return task
                    })
                    const newStateOfTheCategory = {...category, listOfTasks: newListOfTasksUpdated}
                    return newStateOfTheCategory
                }
                return category
            })
            const newStateWithTaskUpdated = { ...state, listOfCategories: newListCategories }
            return newStateWithTaskUpdated

        case 'remove-task':
            const categoryOfTaskToDelete = state.listOfCategories.map(category => {
                if (category.id === action.idCategory) {
                    return category
                }
            }).filter(category => category !== undefined)
    
            const newListOfTasksWithoutPayload = categoryOfTaskToDelete[0].listOfTasks.filter(task => task.id !== action.payload.id)
            const newListWithTaskDeleted = { ...categoryOfTaskToDelete, listOfTasks: newListOfTasksWithoutPayload }
            const newListCategoriesWithTaskDeleted = [...state.listOfCategories, newListWithTaskDeleted]
            const newStateWithTaskDeleted = {...state, listOfCategories: newListCategoriesWithTaskDeleted}
            return newStateWithTaskDeleted
    }
}

export default reducer