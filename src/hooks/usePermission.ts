"use client";

import API from "@/constants/apiEnpoint";
import {
    EntityType,
    PermissionResponse,
    PermissionType,
} from "@/types/entity/PermissionResponse";
import Staff from "@/types/entity/Staff";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { useDeepCompareEffect } from "react-use";

export function usePermission(
    entityType?: EntityType,
    permissionTypes?: PermissionType[],
    ids?: string[],
) {
    const [isAllowed, setIsAllowed] = useState<boolean>();

    useDeepCompareEffect(() => {
        (async () => {
            const accessToken = getCookie("accessToken") || "";
            const staffInfoResponse = await fetch(API.staff.getStaffProfile, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const staffInfo: Staff = await staffInfoResponse.json();
            const permissionResponse = await fetch(
                API.permission.getStaffPermission(staffInfo.id),
                {
                    next: { tags: ["permissions"] },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            const { permissions, authorities } =
                await permissionResponse.json();
            const isAdmin = authorities.some(
                ({ authority }: { authority: string }) => authority === "ADMIN",
            );

            if (isAdmin) setIsAllowed(true);
            else
                setIsAllowed(
                    permissions.some(
                        (permission: PermissionResponse) =>
                            (entityType
                                ? permission.entityType === entityType
                                : true) &&
                            (permissionTypes
                                ? permissionTypes?.includes(
                                      permission.permissionType,
                                  )
                                : true) &&
                            (permission.entityId && ids
                                ? ids.includes(permission.entityId)
                                : true),
                    ),
                );
        })();
    }, [entityType, permissionTypes]);

    return isAllowed;
}
