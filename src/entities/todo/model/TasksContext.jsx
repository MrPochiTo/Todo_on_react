import { createContext, useMemo } from "react";
import useTasks from "./useTasks";
import useTaskScroll from "./useTaskScroll";
export const TasksContext = createContext({})

export const TasksProvider = (props) => {
	const {children} = props
    const {tasks,
    filteredTasks,
    deleteTask,
    deleteAllTask,
    toggleTaskComplete,
	  newTaskTitle,
	  setNewTaskTitle,
	  setSearchQuery,
	  newTaskInputRef,
	  addTask, deleteTaskId, addTaskId} = useTasks()
	const {firstTaskNotComplete,
      firstTaskNotCompleteId } = useTaskScroll(tasks)

  const value = useMemo(() => ({
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
    deleteTaskId,
    addTaskId,
    firstTaskNotComplete,
    firstTaskNotCompleteId,
  }), [tasks,
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
    addTaskId,
    firstTaskNotComplete,
    firstTaskNotCompleteId,])
	return (
	  <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
	)
}