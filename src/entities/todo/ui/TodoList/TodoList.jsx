import {TodoItem, TasksContext} from "@/entities/todo"
import { memo } from "react"
import { useContext } from "react"

const TodoList = (props) => {
  const {styles} = props
  const {
      tasks,
      filteredTasks,
    } = useContext(TasksContext)
	const hasTasks = tasks.length > 0
  const isEmptySearchTask = filteredTasks?.length === 0
	if(!hasTasks) {
		return <div className={styles.emptyMessage}>You dont have task</div>
	}

  if(hasTasks && isEmptySearchTask) {
		return <div className={styles.emptyMessage}>Task not found</div>
	}
	return (
		<ul className={styles.list}>
        {(filteredTasks ?? tasks).map((task) => <TodoItem 
            className={styles.item}
            key={task.id}
            {...task}
            />
        )}
      </ul>
	)
}

export default memo(TodoList)