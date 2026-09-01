import { useCallback, useEffect, useMemo, useState, useRef, useContext } from "react";


const useTasks = () => {

        const [tasks, setTask] = useState([])
        const [newTaskTitle, setNewTaskTitle] = useState('')
        const newTaskInputRef = useRef(null)
        const [searchQuery, setSearchQuery] = useState('')
        useEffect(() => {
            newTaskInputRef.current.focus()
            fetch('http://localhost:3001/task').then((res) => res.json()).then(setTask)
        }, [])
            const deleteAllTask = useCallback(() => {
        const isConfirm = confirm("Вы точно хотите удалить все задачи?")
            Promise.all(
                tasks.map(({id}) => { fetch(`http://localhost:3001/task/${id}`, {
                method: 'DELETE',
            }).then(() => setTask([]))})
            )
        },[tasks])
        const deleteTask = useCallback((taskId) => {
        if(tasks.forEach((task) => { if(task.id === taskId) {
            return task.isDone
        }})) {
            setTask(tasks.filter(({id}) => id !== taskId ))
            fetch(`http://localhost:3001/task/${taskId}`, {
                method: 'DELETE',
            }).then((setTask(tasks.filter(({id}) => id !== taskId ))))
        } else {
            const isConfirm = confirm("Вы хотите отменить задачу")
            if(isConfirm) {
              fetch(`http://localhost:3001/task/${taskId}`, {
                method: 'DELETE',
            }).then((setTask(tasks.filter(({id}) => id !== taskId ))))
            }
        }
        } , [tasks])
        const toggleTaskComplete = useCallback((taskId, isDone) => {
        fetch(`http://localhost:3001/task/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({isDone})
            }).then((isDone) => setTask(tasks.map((task) => {
            if(taskId === task.id) {
                return {...task, isDone}
            }
            return task
        })))
        },[tasks])
    
    
        const addTask = useCallback(() => {
        // const newTaskTitle = newTaskInputRef.current.value
        if(newTaskTitle.trim().length > 0) {
            const newTask = {
                title: newTaskTitle,
                isDone: false
            }
            fetch('http://localhost:3001/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask)
            }).then((res)=> res.json()).then((addedTask) => {
            setTask( (prevTasks) => {
            return [...prevTasks, addedTask]
            })
            setNewTaskTitle('')
            })
            
            // newTaskInputRef.current.focus()
            // newTaskInputRef.current.value = ''
        }
        }, [newTaskTitle])
    
    
    
    
        const filteredTasks = useMemo( () => {
        const clearSearchQuery = searchQuery.trim().toLowerCase()
        return clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null
        }, [tasks,searchQuery])
        return ({tasks,
      filteredTasks,
      deleteTask,
      deleteAllTask,
      toggleTaskComplete,
	  newTaskTitle,
	  setNewTaskTitle,
	  setSearchQuery,
	  newTaskInputRef,
	  addTask,
    })
}

export default useTasks