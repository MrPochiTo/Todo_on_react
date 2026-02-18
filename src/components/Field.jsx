const Field = (props) => {
  const {
    className,
    id,
    label,
    type = "text",
    value,
    onInput,
    ref,
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