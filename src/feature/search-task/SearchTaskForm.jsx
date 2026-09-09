import { useContext } from "react"
import Field from "@/shared/ui/Field"
import { TasksDataContext, ActionTaskContext} from "@/entities/todo"

const SearchTaskForm = (props) => {
  const {styles} = props
  const {
    setSearchQuery
  } = useContext(ActionTaskContext)

   const {
    searchQuery,
  } = useContext(TasksDataContext)
	return (
		<form className={styles.form} onSubmit= {(event) => event.preventDefault()}>
        <Field 
        className={styles.field}
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery} 
        onInput = {setSearchQuery}
        />
      </form>
	)
}

export default SearchTaskForm