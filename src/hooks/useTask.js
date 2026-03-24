import { useState, useRef, useEffect,useCallback,useMemo } from "react"
const useTask = () => {
const [tasks, setTask] = useState([])
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const newTaskInputRef = useRef(null)
	const [searchQuery, setSearchQuery] = useState('')


	useEffect(() => {
		newTaskInputRef.current.focus()

		fetch('http://localhost:3001/tasks')
		.then((response) => response.json())
		.then(setTask)
	}, [])


	const deleteAllTask = useCallback(() => {
	const isConfirm = confirm("Вы точно хотите удалить все задачи?")
	if(isConfirm) {
		setTask([])
	}
	},[])

	const deleteTask = useCallback((taskId) => {
	if(tasks.forEach((task) => { if(task.id === taskId) {
		return task.isDone
	}})) {
		setTask(tasks.filter(({id}) => id !== taskId ))
	} else {
		const isConfirm = confirm("Вы хотите отменить задачу")
		if(isConfirm) {
			setTask(tasks.filter(({id}) => id !== taskId ))
		}
	}
	} , [tasks])
	const toggleTaskComplete = useCallback((taskId, isDone) => {
	setTask(tasks.map((task) => {
		if(taskId === task.id) {
			return {...task, isDone}
		}
		return task
	}))
	},[tasks])


	const addTask = useCallback((title) => {
	// const newTaskTitle = newTaskInputRef.current.value
		const newTask = {
			title,
			isDone: false
		}

		fetch('http://localhost:3001/tasks', {
			method: 'POST',
			headers: {
				"Content-Type": 'application/json',
			},
			body: JSON.stringify(newTask),
		})
		.then((response) => response.json())
		.then((addedTask) => {
			setTask( (prevTasks) => {
		return [...prevTasks, addedTask]
		})
		setNewTaskTitle('')
		})
		// newTaskInputRef.current.focus()
		// newTaskInputRef.current.value = ''
	
	}, [])




	const filteredTasks = useMemo( () => {
	const clearSearchQuery = searchQuery.trim().toLowerCase()
	return clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null
	}, [tasks,searchQuery])
	return {
	  tasks,
      filteredTasks,
      deleteTask,
      deleteAllTask,
      toggleTaskComplete,
	  newTaskTitle,
	  setNewTaskTitle,
	  setSearchQuery,
	  newTaskInputRef,
	  addTask,
	}
}

export default useTask 