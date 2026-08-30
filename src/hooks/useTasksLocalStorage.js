 useEffect(( ) => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        }, [tasks])
const SavedTasks = JSON.parse(localStorage.getItem('tasks'))

usetas