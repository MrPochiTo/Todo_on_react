import Field from "./field"

const SearchTaskForm = (props) => {
  const {
    searchQuery,
    setSearchQuery,
  } = props

  
	return (
		<form className="todo__form" onSubmit= {(event) => event.preventDefault()}>
        <Field 
        className="todo__field"
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