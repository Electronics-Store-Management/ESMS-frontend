import API from "@/constants/apiEnpoint";

import fetchWithToken from "@/utils/fetchWithToken";
import {
    GroupedPermissionTypeList,
    groupPermissionByEntityType,
} from "@/utils/permissionCheck";

import {
    Accordion,
    AccordionContent,
    AccordionPanel,
    AccordionTitle,
    CustomFlowbiteTheme,
} from "flowbite-react";
import { capitalize } from "lodash";
import AddPermissionBtn from "./AddPermissionBtn";
import PermissionItem from "./PermissionItem";
import { revalidateTag } from "next/cache";

export default async function Page({
    params: { id },
}: {
    params: { id: string };
}) {
    const permissionResponse = await fetchWithToken(
        API.permission.getStaffPermission(id),
        { next: { tags: ["permissions"] } },
    );

    if (permissionResponse.status != 200) {
        throw "error";
    }

    const { permissions, authorities } = await permissionResponse.json();

    return (
        <div className=" w-1/3 overflow-auto py-5 px-8 flex flex-col gap-3 rounded-lg border-[1px] border-secondary-200">
            <div className=" grid gap-2">
                <div className=" flex justify-between items-center">
                    <p className=" font-semibold">Permission list</p>
                    <AddPermissionBtn
                        staffId={id}
                        onCreated={async () => {
                            "use server";
                            revalidateTag("permissions");
                        }}
                    />
                </div>
                <Accordion collapseAll className="mt-5" theme={customTheme}>
                    {groupPermissionByEntityType(permissions, authorities).map(
                        ([entityType, permission]) => (
                            <AccordionPanel
                                theme={customTheme}
                                key={entityType}
                            >
                                <AccordionTitle theme={customTheme?.title}>
                                    <p className=" font-medium">
                                        {capitalize(
                                            entityType
                                                .split("_")
                                                .join(" ")
                                                .toLowerCase(),
                                        )}
                                    </p>
                                </AccordionTitle>
                                <AccordionContent theme={customTheme?.content}>
                                    {GroupedPermissionTypeList.map(
                                        (permissionType) => (
                                            <PermissionItem
                                                onRemoved={async () => {
                                                    "use server";
                                                    revalidateTag(
                                                        "permissions",
                                                    );
                                                }}
                                                key={permissionType}
                                                permission={permission}
                                                permissionType={permissionType}
                                            />
                                        ),
                                    )}
                                </AccordionContent>
                            </AccordionPanel>
                        ),
                    )}
                </Accordion>
            </div>
        </div>
    );
}

const customTheme: CustomFlowbiteTheme["accordion"] = {
    root: {
        base: "divide-y divide-gray-200 border-gray-200 ",
        flush: {
            off: "rounded-lg border",
            on: "border-b",
        },
    },
    content: {
        base: "py-4 px-4 last:rounded-b-lg dark:bg-gray-900 first:rounded-t-lg",
    },
    title: {
        arrow: {
            base: "h-5 w-5 shrink-0",
            open: {
                off: "",
                on: "rotate-180",
            },
        },
        base: "flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-3 px-3 text-left font-medium text-gray-500 dark:text-gray-400",
        flush: {
            off: "hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800",
            on: "bg-transparent dark:bg-transparent",
        },
        heading: "",
        open: {
            off: "",
            on: "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white",
        },
    },
};
