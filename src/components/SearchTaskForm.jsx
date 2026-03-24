import { useContext } from "react"
import Field from "./field"
import { TasksContext } from "../context/TasksContext"
import useError from "../hooks/useError"

const SearchTaskForm = () => {
  const {
    searchQuery,
    setSearchQuery,
  } = useContext(TasksContext)
  const {error,setError} = useError()
  
	return (
		<form className="todo__form" onSubmit= {(event) => event.preventDefault()}>
        <Field 
        className="todo__field"
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery} 
        onInput = {setSearchQuery}
        error={error}
		    setError={setError}
        />
      </form>
	)
}

export default SearchTaskForm