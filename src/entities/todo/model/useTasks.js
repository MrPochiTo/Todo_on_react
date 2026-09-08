import { useCallback, useEffect, useMemo, useState, useRef, useReducer } from "react";
import taskApi from "@/shared/api/tasks";
const tasksReducer = (state, action) => {
    switch(action.type){
        case 'SET_ALL': {
            return action.isArray(action.tasks) ? action.tasks : state
        }
        case 'ADD': {
            return [...state, action.task]
        }
        case 'TOGGLE_COMPLETE': {
            const {id, isDone} = action
            return state.map((task) => {
               return task.id === id ? {...task, isDone} : task
            })
        }
        case 'DELETE': {
            
        }
        case 'DELETE_ALL': {
            
        }
    }
}
const useTasks = () => {
    const [tasks, setTask] = useState([])

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const [searchQuery, setSearchQuery] = useState('')

    const [deleteTaskId, setdeleteTaskId] = useState(null)

    const [addTaskId, setaddTaskId] = useState(null)
    
    const newTaskInputRef = useRef(null)
    
    useEffect(() => {
        newTaskInputRef.current.focus()
        taskApi.getAll().then(setTask)
    }, [])
    
    const deleteAllTask = useCallback(() => {
    
        const isConfirm = confirm("Вы точно хотите удалить все задачи?")
    
        taskApi.deleteAll(tasks).then(() => {
    
            setdeleteTaskId('AllTaskDelete')
    
            setTimeout(() => {
                setTask([])
                setdeleteTaskId(null)
        }, 400)
    })
    }, [tasks])
    
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
        setaddTaskId(addedTask.id)
        setTimeout(()=> {
            setaddTaskId(null)
        }, 20000)
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
      addTaskId
    })
}

export default useTasks