
const useTaskLocalStorage = () => {
        const savedTasks = localStorage.getItem('tasks')
        const saveTask = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks))

        return {
                savedTasks: savedTasks ? JSON.parse(savedTasks) : null,
                saveTask,
        }
}

export default useTaskLocalStorage