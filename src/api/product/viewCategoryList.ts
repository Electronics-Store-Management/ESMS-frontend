import apiInstance from "../apiInstance";

export default async function viewCategoryList({ queryKey }: { queryKey: any }) {
	const [_key] = queryKey;
	const response = await apiInstance.get("/category", {
	});

	return response.data;
}