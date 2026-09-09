import { useContext, useState } from "react"
import Button from "@/shared/ui/Button"
import Field from "@/shared/ui/Field"
import { ActionTaskContext } from "@/entities/todo"


const AddTaskForm = (props) => {
	const {styles} = props
	const {
		addTask,
		newTaskInputRef,
	} = useContext(ActionTaskContext)
	
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const onSubmit = (event) => {
		event.preventDefault()
		addTask(newTaskTitle, () => setNewTaskTitle('') )
	}
	
	return (
	<form className={styles.form} onSubmit = {onSubmit} >
        <Field 
		className={styles.field}
		label="New task title"
		id="new-task"
		value={newTaskTitle}
		onInput={setNewTaskTitle}
		ref={newTaskInputRef}
		/>

		<Button type="sumbit"
		isDisable={newTaskTitle.trim().length === 0}>Add</Button >
    </form>
	)
}

export default AddTaskForm