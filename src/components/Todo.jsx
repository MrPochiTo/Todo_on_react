import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
import Button from "./Button"

const Todo = () => {

  const [tasks, setTask] = useState(JSON.parse(localStorage.getItem('tasks')))
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const newTaskInputRef = useRef(null)
  const firstTaskNotComplete = useRef(null)
  const firstTaskNotCompleteId = tasks.find(({isDone})=> !isDone)?.id
  console.log(newTaskInputRef)
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(( ) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
  })


  const deleteAllTask = () => {
    const isConfirm = confirm("Вы точно хотите удалить все задачи?")
    if(isConfirm) {
      setTask([])
    }
  }
  const deleteTask = (taskId) => {
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
  }

  const toggleTaskComplete = (taskId, isDone) => {
    setTask(tasks.map((task) => {
      if(taskId === task.id) {
        return {...task, isDone}
      }
      return task
    }))
  }


  const addTask = () => {
    // const newTaskTitle = newTaskInputRef.current.value
    if(newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false
      }

      setTask([...tasks, newTask])
      setNewTaskTitle('')
      newTaskInputRef.current.focus()
      // newTaskInputRef.current.value = ''
    }
  }


  const clearSearchQuery = searchQuery.trim().toLowerCase()
  const filteredTasks = clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null

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
        done={tasks.filter(({isDone}) => isDone).length}
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