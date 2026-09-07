import { useContext } from "react"
import AddTaskForm from '@feature/add-task'
import SearchTaskForm from '@feature/search-task'
import {TodoInfo} from "@entities/todo"
import {TodoInfo} from "@entities/todo"
import Button from "@shared/ui/Button"
import { TasksContext } from "@entities/todo"
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