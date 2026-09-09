import styles from './Button.module.scss'

const Button = (props) => {
	const {
		className = " ",
		type = "button",
		children,
		onClick,
		isDisable,
	} = props
	return (
		<button
				className={`${styles.button} ${className}`}
				type={type}
				onClick={onClick}
				disabled={isDisable}
			>
				{children}
			</button>
	)
}
export default Button