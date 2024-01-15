import SideBar from "@/components/SideBar/SideBar";
import API from "@/constants/apiEnpoint";
import COOKIE_NAME from "@/constants/cookies";
import SEARCH_PARAMS from "@/constants/searchParams";
import { ModalProvider } from "@/contexts/ModalContext";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import {
    EntityType,
    PermissionType,
    PermissionTypeList,
} from "@/types/entity/PermissionResponse";
import Staff from "@/types/entity/Staff";
import checkPermission from "@/utils/permissionCheck";
import withQuery from "@/utils/withQuery";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Background from "./background";

export default async function Layout({ children }: ReactNodeChildren) {
    const accessToken = cookies().get("accessToken")?.value || "";

    const redirectURI = headers().get(COOKIE_NAME.XURL) || "";

    const staffInfoResponse = await fetch(API.staff.getStaffProfile, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (staffInfoResponse.status !== 200)
        redirect(
            withQuery("/signin", {
                [SEARCH_PARAMS.redirectUri]: redirectURI,
            }),
        );

    const staffInfo: Staff = await staffInfoResponse.json();

    const currentPage = redirectURI
        .split("?")
        .at(0)
        ?.split("/")
        .at(3) as keyof typeof PageEntityType;
    if ((currentPage as string) !== "not-permitted")
        await checkPermission(
            PageEntityType[currentPage]?.type as EntityType,
            PageEntityType[currentPage]?.permissions as PermissionType[],
        );

    return (
        <ModalProvider>
            <div className=" relative w-screen h-screen flex">
                <SideBar staffInfo={staffInfo} />
                <div className=" w-full h-screen bg-background-normal ">
                    <Background />
                    <div className=" z-10 p-5 lg:py-8 lg:pl-10 lg:pr-8 w-full h-screen flex flex-col overflow-hidden">
                        <link rel="icon" href="/favicon.ico" sizes="any" />

                        {children}
                    </div>
                </div>
            </div>
        </ModalProvider>
    );
}

const PageEntityType = {
    product: { type: "PRODUCT", permissions: PermissionTypeList },
    category: { type: "CATEGORY", permissions: PermissionTypeList },
    customer: { type: "CUSTOMER", permissions: PermissionTypeList },
    supplier: { type: "SUPPLIER", permissions: PermissionTypeList },
    staff: { type: "STAFF", permissions: PermissionTypeList },
    import: { type: "IMPORT_BILL", permissions: ["CREATE"] },
    import_bill: { type: "IMPORT_BILL", permissions: PermissionTypeList },
    sale: { type: "SALE_BILL", permissions: ["CREATE"] },
    "sale-invoice": { type: "SALE_BILL", permissions: PermissionTypeList },
    warranty: { type: "WARRANTY_BILL", permissions: ["CREATE"] },
    "warranty-invoice": {
        type: "WARRANTY_BILL",
        permissions: PermissionTypeList,
    },
    home: { type: "DASHBOARD", permissions: PermissionTypeList },
};
