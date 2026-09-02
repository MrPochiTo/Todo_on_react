import { useContext, useState } from "react"
import Button from "./Button"
import Field from "./Field"
import { TasksContext } from "../context/TasksContext"


const AddTaskForm = () => {
	const {
		addTask,
		newTaskTitle,
        setNewTaskTitle,
		newTaskInputRef,
	} = useContext(TasksContext)

	const onSubmit = (event) => {
		event.preventDefault()
		addTask()
	}

const [error, setError] = useState('')
	return (
	<form className="todo__form" onSubmit = {onSubmit} >
        <Field 
		className="todo__field"
		label="New task title"
		id="new-task"
		value={newTaskTitle}
		onInput={setNewTaskTitle}
		ref={newTaskInputRef}
		error={error}
		setError = {setError}
		/>

		<Button type="sumbit"
		isDisable={newTaskTitle.trim().length === 0}>Add</Button >
    </form>
	)
}

export default AddTaskForm