import AddTaskForm from "./AddTaskForm"
import { useContext } from "react"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
import Button from "./Button"
import { TasksContext } from "../context/TasksContext"
const Todo = () => {
const {firstTaskNotComplete} = useContext(TasksContext)

	return (
      <div className="todo">
        <h1 className="todo__title">To Do List</h1>
        <AddTaskForm />
        <SearchTaskForm />
        <TodoInfo />
        <Button 
        onClick={() => {
          firstTaskNotComplete?.current.scrollIntoView({behavior: 'smooth'})
        }}
        >
          Show last not complete task </Button>
        <TodoList />
    </div>
	)
}

export default Todo