import { createContext, useMemo } from "react";
import useTasks from "./useTasks";
import useTaskScroll from "./useTaskScroll";

// 1. Создаем два разных контекста
export const TasksDataContext = createContext(null);
export const ActionTaskContext = createContext(null);

export const TasksProvider = (props) => {
  const { children } = props;
  const {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTask,
    toggleTaskComplete,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    deleteTaskId,
    addTaskId,
  } = useTasks();

  const { firstTaskNotComplete, firstTaskNotCompleteId } = useTaskScroll(tasks);

  // 2. Мемоизируем только данные (меняются при добавлении/удалении/поиске)
  const dataValue = useMemo(() => ({
    tasks,
    filteredTasks,
    firstTaskNotComplete,
    firstTaskNotCompleteId,
  }), [tasks, filteredTasks, firstTaskNotComplete, firstTaskNotCompleteId]);

  // 3. Мемоизируем действия и рефы (их ссылки стабильны, если в useTasks функции обернуты в useCallback)
  const actionsValue = useMemo(() => ({
    deleteTask,
    deleteAllTask,
    toggleTaskComplete,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    deleteTaskId,
    addTaskId,
  }), [
    deleteTask,
    deleteAllTask,
    toggleTaskComplete,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    deleteTaskId,
    addTaskId,
  ]);

  return (
    <TasksDataContext.Provider value={dataValue}>
      <ActionTaskContext.Provider value={actionsValue}>
        {children}
      </ActionTaskContext.Provider>
    </TasksDataContext.Provider>
  );
};