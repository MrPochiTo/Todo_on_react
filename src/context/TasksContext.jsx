import { useCallback, useEffect, useMemo, useState, useRef, useContext } from "react";
import { createContext } from "react";
import useTask from "../hooks/useTask";
export const TasksContext = createContext({})

export const TasksProvider = (props) => {
	const {children} = props
	const {
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
	}=useTask() 
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