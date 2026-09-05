import { useCallback, useEffect, useMemo, useState, useRef, useContext } from "react";
import taskApi from "../api/taskApi";


const useTasks = () => {

        const [tasks, setTask] = useState([])
        const [newTaskTitle, setNewTaskTitle] = useState('')
        const newTaskInputRef = useRef(null)
        const [searchQuery, setSearchQuery] = useState('')
        const [deleteTaskId, setdeleteTaskId] = useState('')
        useEffect(() => {
            newTaskInputRef.current.focus()
            taskApi.getAll().then(setTask)
        }, [])
            const deleteAllTask = useCallback(() => {
        const isConfirm = confirm("Вы точно хотите удалить все задачи?")
            taskApi.deleteAll(tasks).then(() => setTask([]))
        },[tasks])
        const deleteTask = useCallback((taskId) => {
        if(tasks.forEach((task) => { if(task.id === taskId) {
            return task.isDone
        }})) {
            setTask(tasks.filter(({id}) => id !== taskId ))
            taskApi.delete(taskId).then(() => {
                setdeleteTaskId(taskId)
                setTimeout(() => {
                    setTask(
                    tasks.filter(({id}) => id !== taskId )
                )
                setdeleteTaskId(null)
                }, 400)
            })
        } else {
            const isConfirm = confirm("Вы хотите отменить задачу")
            if(isConfirm) {
              taskApi.delete(taskId).then(() => {
                setdeleteTaskId(taskId)
                setTimeout(() => {
                    setTask(
                    tasks.filter(({id}) => id !== taskId )
                )
                setdeleteTaskId(null)
                }, 400)
            })
            }
        }
        } , [tasks])
        const toggleTaskComplete = useCallback((taskId, isDone) => {
        taskApi.toggleComplete(taskId,isDone).then(() => setTask(tasks.map((task) => {
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
            taskApi.add(newTask).then((addedTask) => {
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
      deleteTaskId,
    })
}

export default useTasks