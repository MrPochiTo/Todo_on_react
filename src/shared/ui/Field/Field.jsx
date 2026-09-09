import styles from './Field.module.scss'
import { useState } from 'react'
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
  const [error, setError] = useState('')
  const chekInput = (event) => {
  const {value} = event.target
  const clearValue = value.trim()
  const hasOnlyspaces = value.length > 0 && clearValue.length === 0
  
  onInput(value)
  setError(hasOnlyspaces ? 'The input cannot be empty' : '')
}
	return (
		 <div className={`${styles.field} ${className}  `}>
          <label
            className={styles.label}
            htmlFor={id}
          >
            {label}
          </label>
          <input
            className={`${styles.input} ${error ? styles.isInvalid : ''}`}
            id={id}
            placeholder=""
            autoComplete="off"
            type={type}
            onInput={(event) => {
              chekInput(event)
            }}
            value={value}
            ref={ref}
          />
          {error && (<span className={styles.error} title={error}>{error}</span>)}
        </div>
	)
}
export default Field