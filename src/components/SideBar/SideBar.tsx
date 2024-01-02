import { CustomFlowbiteTheme } from "flowbite-react";

import COOKIE_NAME from "@/constants/cookies";
import Staff from "@/types/entity/Staff";
import { cookies } from "next/headers";
import SideBarUI from "./SideBarUI";

export default function SideBar({ staffInfo }: PropTypes) {
    const isCollapse =
        cookies().get(COOKIE_NAME.SIDE_BAR_COLLAPSE)?.value == "true" || false;

    return <SideBarUI staffInfo={staffInfo} isCollapse={isCollapse} />;
}

type PropTypes = {
    staffInfo: Staff;
};
