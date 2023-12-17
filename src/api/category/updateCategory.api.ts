import apiInstance from "../apiInstance";

export default async function updateCategoryAPI(category: UpdatedCategory) {
    const response = await apiInstance.put(
        `/category/${category.id}`,
        category,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return response.data;
}

export type UpdatedCategory = {
    id: string;
    name: string;
};
