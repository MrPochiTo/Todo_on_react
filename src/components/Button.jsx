const Button = (props) => {
	const {
		className = " ",
		type = "button",
		children,
		isDisable,
		onSumbit,
		onClick,
	} = props
	return (
		<button
				className={`button ${className}`}
				type={type}
				onClick={onClick}
				disabled={isDisable}
			>
				{children}
			</button>
	)
}
export default Button