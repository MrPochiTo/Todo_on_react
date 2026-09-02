import Router from "./Router"
import TaskPage from "./pages/TaskPages"
import TasksPage from "./pages/TasksPages copy"

const App = () => {
  const routes = {
    '/': TasksPage,
    '/task/:id': TaskPage,
    '*': () => <div>404 Page not found</div>,
  }
  return (
   <Router routes={routes}/>
  )
}

export default App
