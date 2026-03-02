import TodoItem from "./TodoItem"
import { memo } from "react"
import { useContext } from "react"
import { TasksContext } from "../context/TasksContext"

const TodoList = () => {
  const {
      tasks,
      filteredTasks,
    } = useContext(TasksContext)
	const hasTasks = tasks.length > 0
  const isEmptySearchTask = filteredTasks?.length === 0
	if(!hasTasks) {
		return <div className="todo__empty-message">You dont have task</div>
	}

  if(hasTasks && isEmptySearchTask) {
		return <div className="todo__empty-message">Task not found</div>
	}
	return (
		<ul className="todo__list">
        {(filteredTasks ?? tasks).map((task) => <TodoItem 
            className="todo__item"
            key={task.id}
            {...task}
            />
        )}
      </ul>
	)
}

export default memo(TodoList)