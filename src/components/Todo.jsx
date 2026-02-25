import { useCallback, useMemo, useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
import Button from "./Button"

const Todo = () => {
  console.log('todo')
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

  const doneTasks = useMemo(() => {
    tasks.filter(({isDone}) => isDone).length
  }, [tasks])


  const filteredTasks = useMemo( () => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()
    return clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null
  }, [tasks,searchQuery])

	return (
	  <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm 
        addTask = {addTask}
        newTaskTitle = {newTaskTitle}
        setNewTaskTitle = {setNewTaskTitle}
        newTaskInputRef = {newTaskInputRef}
      />
      <SearchTaskForm
        searchQuery = {searchQuery}
        setSearchQuery = {setSearchQuery}
      />
      <TodoInfo 
        total={tasks.length} 
        done={doneTasks}
        onDeleteAllBtnClick = {deleteAllTask}
      />
      <Button 
      onClick={() => {
        firstTaskNotComplete?.current.scrollIntoView({behavior: 'smooth'})
      }}
      >
        Show last not complete task </Button>
      <TodoList 
        tasks={tasks}
        filteredTasks = {filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onToggleTaskComplete={toggleTaskComplete}
        firstTaskNotComplete = {firstTaskNotComplete}
        firstTaskNotCompleteId = {firstTaskNotCompleteId}
      />
    </div>
	)
}

export default Todo