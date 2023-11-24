import { SetStateAction, useCallback, useEffect, useState } from "react";

export default function useLocalStorage<T>(
	name: string,
	defaultValue: T
): [T | undefined, (data: T) => void] {
	const [data, _setData] = useState<T>();

	useEffect(() => {
		if (localStorage.getItem(name))
			_setData(JSON.parse(localStorage.getItem(name) || ""));
		else _setData(defaultValue);
	}, [name]);

	const setData = useCallback(
		(action: T | SetStateAction<T | undefined>) => {
			_setData(action);
			if (!action) return;
			localStorage.setItem(name, JSON.stringify(action));
		},
		[name]
	);

	return [data, setData];
}
