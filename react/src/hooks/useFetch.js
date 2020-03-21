import { useState, useEffect } from 'react'

export const useFetch = (url, options) => {
	const [response, setResponse] = useState(null)
	const [loadingState, setLoadingState] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url, options)
				const json = await response.json()
				setResponse(json)
				setLoadingState('loaded')
			} catch (err) {
				setError(err)
				setLoadingState('loaded')
			}
		}
		fetchData()
	}, [url, options])
	return { response, error, loadingState }
}
