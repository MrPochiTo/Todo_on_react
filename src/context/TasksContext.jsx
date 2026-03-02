import { useCallback, useEffect, useMemo, useState, useRef, useContext } from "react";
import { createContext } from "react";
import useTask from "../hooks/useTask";
import useCompleteTaskScroll from "../hooks/useCompleteTaskScroll";
export const TasksContext = createContext({})

export const TasksProvider = (props) => {
	const {children} = props
	const {
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
	}=useTask() 
	const {
		firstTaskNotComplete,
		firstTaskNotCompleteId,
	} = useCompleteTaskScroll(tasks)
	return (
	  <TasksContext.Provider
    value={{
	  tasks,
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
    }}>
      {children}
    </TasksContext.Provider>
	)
}