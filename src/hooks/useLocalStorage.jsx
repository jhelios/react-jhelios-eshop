import { useEffect, useState } from "react"

function useLocalStorage(name, initialValue) {
	const [item, setItem] = useState(initialValue)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const localStorageItem = localStorage.getItem(name)
		if (localStorageItem) {
			setItem(JSON.parse(localStorageItem))
		}
		setLoading(true)
	}, [])

	const saveItem = (newItem) => {
		localStorage.setItem(name, JSON.stringify(newItem))
		setItem(newItem)
	}

	return { item, saveItem, loading }
}

export default useLocalStorage
