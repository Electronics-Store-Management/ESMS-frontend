import apiInstance from "../apiInstance";

export default async function viewProductList({ queryKey }: { queryKey: any }) {
	const [_key, name] = queryKey;
	const response = await apiInstance.get("/product", {
		params: { name },
	});

	return response.data;
}
