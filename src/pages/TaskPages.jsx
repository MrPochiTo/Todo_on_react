import { useEffect, useState } from "react"
import taskApi from "../api/taskApi"

const TaskPage = (props) => {
    const {params} = props
    const taskId = params.id
    const [task, setTask] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    useEffect(() =>{
        taskApi.getById(taskId).then( (taskData)=>{
            setTask(taskData) 
            setHasError(false)
        } ).catch(()=> {
            setHasError(true)
        }).finally(() => {
            setLoading(false)
        })}, [taskId])
        if(isLoading) {
            return <div>loading...</div>
    }
        if(hasError) {
            return <div>task not found</div>
        }
    return (
        <div>
        <h1>{task.title}</h1>
        {task.isDone ? "Задача выполнена" : "Задача не выполнена"}
        </div>
    )
}

export default TaskPage