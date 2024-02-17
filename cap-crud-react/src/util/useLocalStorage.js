import { useState } from "react";

// source: https://dev.to/michael_osas/using-the-local-storage-api-in-react-creating-a-custom-hook-component-26pk

export default function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	const removeValue = () => {
		try {
			setStoredValue(null);
			window.localStorage.removeItem(key);
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue, removeValue];
}
