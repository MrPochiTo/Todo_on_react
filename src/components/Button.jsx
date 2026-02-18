const Button = (props) => {
	const {
		className = " ",
		type = "button",
		children,
		onSumbit,
	} = props
	return (
		<button
				className={`button ${className}`}
				type={type}
			>
				{children}
			</button>
	)
}
export default Button