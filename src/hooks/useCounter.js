import { useState } from "react";

export const useCounter = ( initialState = 1 ) => {
	const [counter, setCounter] = useState(initialState);

	const increment = () => {
		setCounter( counter + 1)
	}
	const reset = () => {
		setCounter(initialState)
	}
	const decrement = () => {
			setCounter( counter - 1)
	}
	/* const decrement = (factor = 1) => {
		setCounter( counter - factor)
	} */
	return {
		counter,
		increment,
		reset,
		decrement
	}
}
