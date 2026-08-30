import { useRef } from "react"
const useTaskScroll = (tasks) => {
    const firstTaskNotComplete = useRef(null)
    const firstTaskNotCompleteId = tasks.find(({isDone})=> !isDone)?.id
        return {
firstTaskNotComplete,
firstTaskNotCompleteId
        }
}
export default useTaskScroll