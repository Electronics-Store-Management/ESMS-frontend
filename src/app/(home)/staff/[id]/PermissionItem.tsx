"use client";

import { GroupedPermission } from "@/utils/permissionCheck";
import { capitalize } from "lodash";
import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { GoDash } from "react-icons/go";
import Button from "@/components/Button/Button";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import { useMutation } from "react-query";
import removePermission from "@/api/permission/removePermission";

export default function PermissionItem({
    permission,
    permissionType,
    className,
    onRemoved,
    ...props
}: PropTypes) {
    const { openClaimModal } = useClaimModal();

    const deleteMutation = useMutation(removePermission);

    return (
        <div key={permissionType} className={className} {...props}>
            {permission[permissionType].type === "all" ? (
                <div className=" group my-1 flex justify-between">
                    <p className=" flex gap-2 items-center text-secondary-950 font-medium">
                        <IoCheckmarkSharp className=" text-green-600" />
                        {capitalize(permissionType)} all items
                    </p>
                    {permission[permissionType].id ? (
                        <Button
                            size={"sm"}
                            btnType={"error"}
                            className=" opacity-0 group-hover:opacity-100 duration-200"
                            onClick={() => {
                                openClaimModal(
                                    <>Do you want to remove this permission </>,
                                    (confirm) => {
                                        if (confirm) {
                                            deleteMutation.mutate(
                                                permission[permissionType]
                                                    ?.id || "",
                                            );
                                            onRemoved();
                                        }
                                    },
                                );
                            }}
                        >
                            <GoDash />
                            <p className="ml-1">Remove</p>
                        </Button>
                    ) : null}
                </div>
            ) : permission[permissionType].entityId?.length ? (
                <div>
                    <p className=" flex gap-2 items-center font-medium text-secondary-950">
                        <IoCheckmarkSharp className=" text-green-600" />
                        {capitalize(permissionType)} following items:{" "}
                    </p>
                    <ul className="grid gap-1 mt-2">
                        {permission[permissionType].entityId?.map(
                            (id: string) => (
                                <li
                                    key={id}
                                    className=" font-semibold text-xs text-secondary-950 hover:text-primary-700 cursor-pointer duration-200"
                                >
                                    {id}
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}

interface PropTypes extends React.ComponentPropsWithoutRef<"div"> {
    permission: {
        [a: string]: GroupedPermission;
    };
    onRemoved: () => any;
    permissionType: string;
}
