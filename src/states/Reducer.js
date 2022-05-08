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
            const thisCategory = state.listOfCategories.map(category => {
                if (category.id === action.payload.category.id) {
                    return category
                }
            }).filter(category => category !== undefined)

            const listOfTaskOfThisCategory = [...thisCategory[0].listOfTasks]
            const newListOfTask = [...listOfTaskOfThisCategory, newTask]
            const newStateOfCategory = { ...thisCategory[0], listOfTasks: newListOfTask }
            const newListCategoriesFiltered = state.listOfCategories.map(category => {
                if (category.id !== newStateOfCategory.id) {
                    return category
                }
            }).filter(category => category !== undefined)

            const newListOfCategoriesWithNewTask = [...newListCategoriesFiltered, newStateOfCategory]
            const newStateOfCategoriesWithNewCategoryTask = { ...state, listOfCategories: newListOfCategoriesWithNewTask }
            console.log(newStateOfCategoriesWithNewCategoryTask);
            return newStateOfCategoriesWithNewCategoryTask

        case 'update-task':
            const categoryOfTaskToUpdated = state.listOfCategories.map(category => {
                if (category.id === action.idCategory) {
                    return category
                }
            }).filter(category => category !== undefined)

            const newListOfTasksUpdated = categoryOfTaskToUpdated[0].listOfTasks.map(task => {
                if (task.id === action.payload.id) {
                    return action.payload
                }
                return task
            })
            const categoryListOfTaskFiltered = categoryOfTaskToUpdated[0].listOfTasks.map(task => {
                if (task.id !== newListOfTasksUpdated[0].id) {
                    return task
                }
            }).filter(task => task !== undefined)

            const newListUpdated = [...categoryListOfTaskFiltered, newListOfTasksUpdated[0]]
            const newStateOfTheCategory = { ...categoryOfTaskToUpdated[0], listOfTasks: newListUpdated }
            const categoryStateFiltered = state.listOfCategories.map(category => {
                if (category.id !== newStateOfTheCategory.id) {
                    return category
                }
            }).filter(task => task !== undefined)

            const newListCategories = [...categoryStateFiltered, newStateOfTheCategory]
            const newStateWithTaskUpdated = { ...state, listOfCategories: newListCategories.reverse() }
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