import { useRef } from "react"
const useCompleteTaskScroll = (tasks) => {
	const firstTaskNotComplete = useRef(null)
	const firstTaskNotCompleteId = tasks.find(({isDone})=> !isDone)?.id

	return {
		firstTaskNotComplete,
		firstTaskNotCompleteId,
	}
}
export default useCompleteTaskScroll