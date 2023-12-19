import SideBar from "@/components/SideBar/SideBar";
import API from "@/constants/apiEnpoint";
import COOKIE_NAME from "@/constants/cookies";
import SEARCH_PARAMS from "@/constants/searchParams";
import { ModalProvider } from "@/contexts/ModalContext";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import Staff from "@/types/entity/Staff";
import withQuery from "@/utils/withQuery";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: ReactNodeChildren) {
    const myHeaders = new Headers();
    const accessToken = cookies().get("accessToken")?.value || "";
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const redirectURI = headers().get(COOKIE_NAME.XURL) || "";

    const staffInfoResponse = await fetch(API.staff.getStaffProfile, {
        headers: myHeaders,
    });

    if (staffInfoResponse.status !== 200)
        redirect(
            withQuery("/signin", {
                [SEARCH_PARAMS.redirectUri]: redirectURI,
            }),
        );

    const staffInfo: Staff = await staffInfoResponse.json();

    return (
        <ModalProvider>
            <div className=" w-screen h-screen flex">
                <div className=" w-max z-50">
                    <SideBar staffInfo={staffInfo} />
                </div>
                <div className=" py-8 pl-10 pr-8 w-full h-screen bg-background-normal overflow-hidden">
                    {children}
                </div>
            </div>
        </ModalProvider>
    );
}
