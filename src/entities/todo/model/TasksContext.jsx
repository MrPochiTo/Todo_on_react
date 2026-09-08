import { createContext } from "react";
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
    addTaskId,
    }}>
      {children}
    </TasksContext.Provider>
	)
}