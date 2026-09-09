import { memo,useContext,useMemo } from "react"
import { TasksDataContext,ActionTaskContext } from "@/entities/todo"
const TodoInfo = (props) => {
	const {styles} = props
	const {
		tasks = [],

	} = useContext(TasksDataContext)
	const {
		deleteAllTask
	} = useContext(ActionTaskContext)
	const total = tasks.length
	const hasTasks = total > 0
	const done = useMemo(() => {
     return tasks.filter(({isDone}) => isDone).length
  }, [tasks])
console.log('as12')
	return (
		<div className={styles.info}>
			<div className={styles.title}>
				Done {done}, from {total}
			</div>
			{hasTasks && (
				<button 
					className={styles.deleteAll}
					type="button"
					onClick={deleteAllTask}
				>
					Delete all
				</button>
			)}
    	</div>
	)
}

export default memo(TodoInfo)