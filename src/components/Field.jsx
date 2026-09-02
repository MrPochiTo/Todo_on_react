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
            className="field__input"
            id={id}
            placeholder=""
            autoComplete="off"
            type={type}
            onInput={(event) => {
              onInput(event.target.value)
            }}
            value={value}
            ref={ref}
          />
        </div>
	)
}
export default Field