import API from "@/constants/apiEnpoint";
import {
    Authority,
    EntityType,
    EntityTypeList,
    PermissionResponse,
    PermissionType,
    PermissionTypeList,
} from "@/types/entity/PermissionResponse";
import fetchWithToken from "./fetchWithToken";
import { cookies, headers } from "next/headers";
import COOKIE_NAME from "@/constants/cookies";
import Staff from "@/types/entity/Staff";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import { getCookie } from "cookies-next";

export const GroupedPermissionTypeList = ["update", "create", "view", "delete"];

type GroupedPermissionType = "update" | "create" | "view" | "delete";

export type GroupedPermission = {
    type: "item" | "all";
    entityId?: string[];
    id?: string;
};

export async function hasPermission(
    entityType: EntityType,
    permissionTypes: PermissionType[],
): Promise<boolean> {
    const accessToken = cookies().get("accessToken")?.value || "";
    const staffInfoResponse = await fetch(API.staff.getStaffProfile, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const staffInfo: Staff = await staffInfoResponse.json();
    const permissionResponse = await fetchWithToken(
        API.permission.getStaffPermission(staffInfo.id),
        { next: { tags: ["permissions"] } },
    );

    const { permissions, authorities } = await permissionResponse.json();
    const isAdmin = authorities.some(
        ({ authority }: { authority: string }) => authority === "ADMIN",
    );

    // console.log({ isAdmin, permissions, permissionTypes, entityType });

    if (isAdmin) return true;

    return permissions.some(
        (permission: PermissionResponse) =>
            permission.entityType === entityType &&
            permissionTypes.includes(permission.permissionType),
    );
}

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

export default async function checkPermission(
    entityType: EntityType,
    permissions: PermissionType[],
) {
    if (!entityType || !permissions) return;
    if (!(await hasPermission(entityType, permissions)))
        redirect("/not-permitted");
}
