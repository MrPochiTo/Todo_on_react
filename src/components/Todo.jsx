import { useState } from "react"
import { useEffect } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"

const Todo = () => {

  const [tasks, setTask] = useState(JSON.parse(localStorage.getItem('tasks')))
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(( ) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  const deleteAllTask = () => {
    const isConfirm = confirm("Вы точно хотите удалить все задачи?")
    if(isConfirm) {
      setTask([])
    }
  }
  const deleteTask = (taskId) => {
    if(tasks.map((task) => { if(task.id === taskId) {return task.isDone}})) {
      const isConfirm = confirm("Вы точно хотите отменить задачу?")
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
    if(newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false
      }

      setTask([...tasks, newTask])
      setNewTaskTitle('')
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
      <TodoList 
        tasks={tasks}
        filteredTasks = {filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onToggleTaskComplete={toggleTaskComplete}
      />
    </div>
	)
}

export default Todo