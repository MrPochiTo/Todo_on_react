import TodoItem from "./TodoItem"


const TodoList = (props) => {
  const {
    tasks = [],
    onDeleteTaskButtonClick,
    onToggleTaskComplete,
    filteredTasks,
  } = props
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
            onDeleteTaskButtonClick = {onDeleteTaskButtonClick}
            onToggleTaskComplete = {onToggleTaskComplete}
            {...task}
            />
        )}
      </ul>
	)
}

export default TodoList