import StoreProvider from "./components/StoreProvider"
import Dashboard  from "./components/Dashboard";
import ListOfCategories from "./components/ListOfCategories";

function App() {

  return (
    <StoreProvider>
      <Dashboard />
    </StoreProvider>
  )
}

export default App
