import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

	const isMounted = useRef(true)

	const [state, setState] = useState({
		loading: true,
		data: null,
		error: null
	})

	useEffect(() => {

		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {

		setState({loading: true,
			data: null,
			error: null})

		fetch(url)
			.then(resp => resp.json())
			.then(data => {

				setTimeout(() =>{
					if(isMounted.current) {

						setState({
								loading: false,
								error: null,
								data: data
							})
						} else {
							console.log('No se llamó');
						}
				}, 0)
			})
			.catch( () => {
				setState({
					loading: false,
					data: null,
					error: 'No se pudo cargar la Data'
				})
			})
	}, [url])
	return state
}
