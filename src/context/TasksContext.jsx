import { createContext } from "react";
import useTasks from "../hooks/useTasks";
import useTaskScroll from "../hooks/useTaskScroll";
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
	  addTask, deleteTaskId} = useTasks()
	const {firstTaskNotComplete,
      firstTaskNotCompleteId } = useTaskScroll(tasks)
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
    deleteTaskId,
    }}>
      {children}
    </TasksContext.Provider>
	)
}