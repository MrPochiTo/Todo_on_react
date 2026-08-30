import { useCallback, useEffect, useMemo, useState, useRef, useContext } from "react";
import { createContext } from "react";
export const TasksContext = createContext({})

export const TasksProvider = (props) => {
	const {children} = props
	const [tasks, setTask] = useState(JSON.parse(localStorage.getItem('tasks')))
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const newTaskInputRef = useRef(null)
	const firstTaskNotComplete = useRef(null)
	const firstTaskNotCompleteId = tasks.find(({isDone})=> !isDone)?.id
	const [searchQuery, setSearchQuery] = useState('')
	useEffect(( ) => {
	localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	useEffect(() => {
		newTaskInputRef.current.focus()
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


	const addTask = useCallback(() => {
	// const newTaskTitle = newTaskInputRef.current.value
	if(newTaskTitle.trim().length > 0) {
		const newTask = {
			id: crypto?.randomUUID() ?? Date.now().toString(),
			title: newTaskTitle,
			isDone: false
		}

		setTask( (prevTasks) => {
		return [...prevTasks, newTask]
		})
		setNewTaskTitle('')
		// newTaskInputRef.current.focus()
		// newTaskInputRef.current.value = ''
	}
	}, [newTaskTitle])




	const filteredTasks = useMemo( () => {
	const clearSearchQuery = searchQuery.trim().toLowerCase()
	return clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null
	}, [tasks,searchQuery])
	return (
	  <TasksContext.Provider
    value={{tasks,
      filteredTasks,
      firstTaskNotComplete,
      firstTaskNotCompleteId,
      deleteTask,
      deleteAllTask,
      toggleTaskComplete,
	  newTaskTitle,
	  setNewTaskTitle,
	  setSearchQuery,
	  newTaskInputRef,
	  addTask,
    }}>
      {children}
    </TasksContext.Provider>
	)
}