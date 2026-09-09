import { useCallback, useEffect, useMemo, useState, useRef, useReducer } from "react";
import taskApi from "@/shared/api/tasks";
const tasksReducer = (state, action) => {
    switch(action.type){
        case 'SET_ALL': {
            return Array.isArray(action.tasks) ? action.tasks : state
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
            return state.filter((task) => task.id !== action.id)
        }
        case 'DELETE_ALL': {
            return []
        }
        default:{
            console.error("Ошибка")
        }
    }
}
const useTasks = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, [])

    const [searchQuery, setSearchQuery] = useState('')

    const [deleteTaskId, setdeleteTaskId] = useState(null)

    const [addTaskId, setaddTaskId] = useState(null)
    
    const newTaskInputRef = useRef(null)
    
    useEffect(() => {
        newTaskInputRef.current?.focus()
        taskApi.getAll().then((Tasks) => dispatch({type: 'SET_ALL', tasks: Tasks    }))
    }, [])
    
    const deleteAllTask = useCallback(() => {
    
        const isConfirm = confirm("Вы точно хотите удалить все задачи?")
    
        taskApi.deleteAll(tasks).then(() => {
    
            setdeleteTaskId('AllTaskDelete')
    
            setTimeout(() => {
                dispatch({type: 'DELETE_ALL'})
                setdeleteTaskId(null)
        }, 400)
    })
    }, [tasks])
    
    const deleteTask = useCallback((taskId) => {
        const isConfirm = confirm("Вы хотите отменить задачу")
        if(isConfirm) {
            taskApi.delete(taskId).then(() => {
            setdeleteTaskId(taskId)
            setTimeout(() => {
                dispatch({type: 'DELETE', id: taskId })
                setdeleteTaskId(null)
            }, 400)
        })
    }
    } , [])
    const toggleTaskComplete = useCallback((taskId, isDone) => {
    taskApi.toggleComplete(taskId,isDone).then(() => dispatch({type:'TOGGLE_COMPLETE' , id:taskId , isDone: isDone}))
    },[])


    const addTask = useCallback((title, callback) => {
    if(title.trim().length > 0) {
        const newTask = {
            title,
            isDone: false
        }
        taskApi.add(newTask).then((addedTask) => {
        dispatch({type:'ADD', task: addedTask})
        callback()
        setaddTaskId(addedTask.id)
        setTimeout(()=> {
            setaddTaskId(null)
        }, 400)
        })
    }
    }, [])
        const filteredTasks = useMemo( () => {
        const clearSearchQuery = searchQuery.trim().toLowerCase()
        return clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null
        }, [tasks,searchQuery])
        return ({tasks,
      filteredTasks,
      deleteTask,
      deleteAllTask,
      toggleTaskComplete,
	  setSearchQuery,
	  newTaskInputRef,
      searchQuery,
	  addTask,
      deleteTaskId,
      addTaskId
    })
}

export default useTasks