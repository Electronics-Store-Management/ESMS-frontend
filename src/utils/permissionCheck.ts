import {
    Authority,
    EntityType,
    EntityTypeList,
    PermissionResponse,
    PermissionTypeList,
} from "@/types/entity/PermissionResponse";

export const GroupedPermissionTypeList = ["update", "create", "view", "delete"];

type GroupedPermissionType = "update" | "create" | "view" | "delete";

export type GroupedPermission = {
    type: "item" | "all";
    entityId?: string[];
    id?: string;
};

export function groupPermissionByEntityType(
    permissions: PermissionResponse[],
    authorities: Authority[],
) {
    let groupedPermissions: {
        [key: string]: {
            [a: string]: GroupedPermission;
        };
    } = {};

    const isAdmin = authorities.some(({ authority }) => authority === "ADMIN");

    EntityTypeList.forEach((entityType) => {
        //@ts-ignore
        groupedPermissions[entityType] = {};
        GroupedPermissionTypeList.forEach((permissionType) => {
            if (isAdmin)
                groupedPermissions[entityType][permissionType] = {
                    type: "all",
                };
            else
                groupedPermissions[entityType][permissionType] = {
                    type: "item",
                    entityId: [],
                };
        });
    });

    permissions.forEach((permission) => {
        if (isAdmin) {
            return;
        } else if (
            ["UPDATE_ALL", "VIEW_ALL", "DELETE_ALL", "CREATE"].includes(
                permission.permissionType,
            )
        ) {
            groupedPermissions[permission.entityType][
                permission.permissionType.split("_").at(0)?.toLowerCase() || ""
            ] = {
                type: "all",
                id: permission.id,
            };

            if (
                ["UPDATE_ALL", "DELETE_ALL", "CREATE"].includes(
                    permission.permissionType,
                )
            ) {
                groupedPermissions[permission.entityType]["view"] = {
                    type: "all",
                };
            }
        } else if (
            groupedPermissions[permission.entityType][
                permission.permissionType.split("_").at(0)?.toLowerCase() || ""
            ].type !== "all"
        ) {
            groupedPermissions[permission.entityType][
                permission.permissionType.split("_").at(0)?.toLowerCase() || ""
            ] = {
                type: "item",
                entityId: [
                    ...(groupedPermissions[permission.entityType][
                        permission.permissionType
                    ]?.entityId || []),
                    ...(permission.entityId ? [permission.entityId] : []),
                ],
            };
        }
    });

    return Array.from(Object.entries(groupedPermissions));
}

export default function permissionCheck() {}
