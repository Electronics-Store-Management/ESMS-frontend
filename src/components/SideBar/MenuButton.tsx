import { useSideBarState } from "@/contexts/SideBar";

import { HiMenu } from "react-icons/hi";

export default function MenuButton() {
    const { isCollapse, setIsCollapse } = useSideBarState();

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                setIsCollapse((prev) => !prev);
            }}
            className={` w-fit z-10 duration-300 rounded border-0 p-1 bg-background-normal active:shadow-lg active:bg-background-active`}
        >
            <HiMenu
                className={` z-10 text-secondary-300 w-5 h-5 ${
                    isCollapse ? " rotate-180" : ""
                }`}
            />
        </button>
    );
}
