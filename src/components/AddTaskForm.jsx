import Button from "./Button"
import Field from "./field"


const AddTaskForm = (props) => {
	const {
		addTask,
		newTaskTitle,
        setNewTaskTitle,
		newTaskInputRef,
	} = props

	const onSubmit = (event) => {
		event.preventDefault()
		addTask()
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
		/>

		<Button type="sumbit">Add</Button >
    </form>
	)
}

export default AddTaskForm