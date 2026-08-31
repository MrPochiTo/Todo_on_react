const Field = (props) => {
  const {
    className,
    id,
    label,
    type = "text",
    value,
    onInput,
    ref,
    error,
    setError
  } = props

	return (
		 <div className={`${className} field `}>
          <label
            className="field__label"
            htmlFor={id}
          >
            {label}
          </label>
          <input
            className={`field__input ${error ? 'is-invalid' : ''}`}
            id={id}
            placeholder=""
            autoComplete="off"
            type={type}
            onInput={(event) => {
              const {value} = event.target
              const clearValue = value.trim()
		          const hasSpaceOnInput = value.length > 0 && clearValue.length === 0
              onInput(value)
              setError(hasSpaceOnInput ? "Задача из пробелов серьёзно)" : '')
            }}
            value={value}
            ref={ref}
          />
          {error && (<span className="field__Error">{error}</span>)}
        </div>
	)
}
export default Field