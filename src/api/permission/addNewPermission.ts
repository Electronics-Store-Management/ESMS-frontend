import { CONTENT_TYPE } from "@/constants/contentType";
import { Permission } from "@/types/entity/PermissionResponse";
import apiInstance from "../apiInstance";

export default async function addNewPermission(permission: Permission) {
    const response = await apiInstance.post("/permission", permission, {
        headers: CONTENT_TYPE.json,
    });

    return response.data;
}
