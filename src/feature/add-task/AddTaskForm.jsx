import { useContext, useState } from "react"
import Button from "@/shared/ui/Button"
import Field from "@/shared/ui/Field"
import { TasksContext } from "@/entities/todo"


const AddTaskForm = (props) => {
	const {styles} = props
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
	<form className={styles.form} onSubmit = {onSubmit} >
        <Field 
		className={styles.field}
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