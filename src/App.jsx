
import Todo from "./components/Todo"
import {TasksProvider} from "./context/TasksContext"



const App = () => {
   console.log('as')
  return (
    <TasksProvider>
          <Todo />
    </TasksProvider>
  )
}

export default App
