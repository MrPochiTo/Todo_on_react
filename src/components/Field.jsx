const Field = (props) => {
  const {
    className,
    id,
    label,
    type = "text",
    error,
    value,
    onInput,
    ref,
    setError,
  } = props
const chekInput = (event) => {
  const {value} = event.target
  const clearValue = value.trim()
  const hasOnlyspaces = value.length > 0 && clearValue.length === 0
  
  onInput(value)
  setError(hasOnlyspaces ? 'The input cannot be empty' : '')
}
	return (
		 <div className={`${className} field `}>
          <label
            className="field__label"
            htmlFor={id}
          >
            {label}
          </label>
          <input
            className={`field__input ${error ? "is-invalid" : ""}`}
            id={id}
            placeholder=""
            autoComplete="off"
            type={type}
            onInput={chekInput}
            value={value}
            ref={ref}
          />
          {error && 
          (<span className="field__error">
            {error}
          </span>)}
        </div>
	)
}
export default Field