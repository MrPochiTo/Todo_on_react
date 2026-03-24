import { useContext, useState } from "react"
import Button from "./Button"
import Field from "./field"
import { TasksContext } from "../context/TasksContext"
import useError from "../hooks/useError"


const AddTaskForm = () => {
	const {
		addTask,
		newTaskTitle,
        setNewTaskTitle,
		newTaskInputRef,
	} = useContext(TasksContext)
	
	const clearNewTaskTitle = newTaskTitle.trim()
	const {error, setError} = useError()
	const isDisable = clearNewTaskTitle.length === 0
	console.log(isDisable)
	const onSubmit = (event) => {
		event.preventDefault()

		if(!isDisable) {
			addTask(clearNewTaskTitle)
		}
	}
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
		setError={setError}
		/>

		<Button
		type="sumbit"
		isDisable={isDisable}
		>
		Add
		</Button >
    </form>
	)
}

export default AddTaskForm