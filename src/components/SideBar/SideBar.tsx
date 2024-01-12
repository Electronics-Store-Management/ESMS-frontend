import COOKIE_NAME from "@/constants/cookies";
import Staff from "@/types/entity/Staff";
import { cookies } from "next/headers";
import SideBarUI from "./SideBarUI";

export default function SideBar({ staffInfo }: PropTypes) {
    const isCollapse =
        cookies().get(COOKIE_NAME.SIDE_BAR_COLLAPSE)?.value == "true" || false;

    return (
        <div className=" absolute top-0 left-0 h-screen md:relative md:w-max z-50">
            <SideBarUI staffInfo={staffInfo} isCollapse={isCollapse} />
        </div>
    );
}

type PropTypes = {
    staffInfo: Staff;
};
