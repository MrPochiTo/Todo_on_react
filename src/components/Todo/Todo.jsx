import AddTaskForm from "../AddTaskForm/AddTaskForm"
import { useContext } from "react"
import SearchTaskForm from "../SearchTaskForm/SearchTaskForm"
import TodoInfo from "../TodoInfo/TodoInfo"
import TodoList from "../TodoList/TodoList"
import Button from "../Button/Button"
import { TasksContext } from "../../context/TasksContext"
import styles from "./Todo.module.scss"
const Todo = () => {
const {firstTaskNotComplete} = useContext(TasksContext)

	return (
      <div className={styles.todo}>
        <h1 className={styles.title}>To Do List</h1>
        <AddTaskForm styles = {styles}/>
        <SearchTaskForm styles = {styles}/>
        <TodoInfo styles = {styles} />
        <Button 
        onClick={() => {
          firstTaskNotComplete?.current.scrollIntoView({behavior: 'smooth'})
        }}
        >
          Show last not complete task </Button>
        <TodoList  styles = {styles} />
    </div>
	)
}

export default Todo