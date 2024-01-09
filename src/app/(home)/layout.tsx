import SideBar from "@/components/SideBar/SideBar";
import API from "@/constants/apiEnpoint";
import COOKIE_NAME from "@/constants/cookies";
import SEARCH_PARAMS from "@/constants/searchParams";
import { ModalProvider } from "@/contexts/ModalContext";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { EntityType } from "@/types/entity/PermissionResponse";
import Staff from "@/types/entity/Staff";
import checkPermission from "@/utils/permissionCheck";
import withQuery from "@/utils/withQuery";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

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
        .split("/")
        .at(3) as keyof typeof PageEntityType;
    if ((currentPage as string) !== "not-permitted")
        await checkPermission(PageEntityType[currentPage] as EntityType);

    return (
        <ModalProvider>
            <div className=" w-screen h-screen flex">
                <div className=" w-max z-50">
                    <SideBar staffInfo={staffInfo} />
                </div>
                <div className=" py-8 pl-10 pr-8 w-full h-screen flex flex-col bg-background-normal overflow-hidden">
                    {children}
                </div>
            </div>
        </ModalProvider>
    );
}

const PageEntityType = {
    product: "PRODUCT",
    category: "CATEGORY",
    customer: "CUSTOMER",
    staff: "STAFF",
    import_bill: "IMPORT_BILL",
    "sale-invoice": "SALE_BILL",
    "warranty-invoice": "WARRANTY_BILL",
    home: "DASHBOARD",
};
