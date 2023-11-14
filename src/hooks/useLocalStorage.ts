import { useState, useEffect } from "react";

export default function useLocalStorage<T>(
	name: string,
	defaultValue: T
): [T, (data: T) => void] {
	const [data, setData] = useState<T>(defaultValue);

	useEffect(() => {
        console.log('reload useLocalStorage')
		const value = localStorage.getItem(name);
		setData(value != null ? JSON.parse(value) : defaultValue);
	}, [JSON.stringify(defaultValue), name]);

	useEffect(() => {
		if (data) localStorage.setItem(name, JSON.stringify(data));
	}, [data, name]);

	return [data === undefined ? defaultValue : data, setData];
}
