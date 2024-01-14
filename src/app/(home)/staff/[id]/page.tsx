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

    console.log({ permissions, authorities });
    console.log(groupPermissionByEntityType(permissions, authorities).at(-1));

    return (
        <div className=" w-full lg:w-1/3 overflow-auto lg:py-5 lg:px-8 flex flex-col gap-3 rounded-lg lg:border-[1px] border-secondary-200">
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
        base: "divide-y !border-secondary-200 !divide-secondary-200 ",
        flush: {
            off: "rounded-lg !border-secondary-200 !divide-secondary-200  border divide-secondary-200",
            on: "border-b divide-secondary-200 !border-secondary-200 !divide-secondary-200 ",
        },
    },
    content: {
        base: "py-4 px-4 last:rounded-b-lg  !border-secondary-200  !divide-secondary-200 first:rounded-t-lg",
    },
    title: {
        arrow: {
            base: "h-5 w-5 shrink-0",
            open: {
                off: "",
                on: "rotate-180",
            },
        },
        base: "flex !border-secondary-200 w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-3 px-3 text-left font-medium text-secondary-500 ",
        flush: {
            off: "border-secondary-200 hover:bg-secondary-100 focus:ring-4 focus:ring-secondary-200 ",
            on: "bg-transparent ",
        },
        heading: "",
        open: {
            off: "",
            on: "text-secondary-900 bg-secondary-100 font-semibold",
        },
    },
};
