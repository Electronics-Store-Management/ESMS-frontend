import { useSideBarState } from "@/contexts/SideBar";

import { HiMenu } from "react-icons/hi";
import Button from "../Button/Button";

export default function MenuButton({ className }: React.ComponentProps<"div">) {
    const { isCollapse, setIsCollapse } = useSideBarState();

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                setIsCollapse((prev) => !prev);
            }}
            className={` w-fit z-10 p-1 duration-300 rounded border-0 bg-background-normal active:shadow-lg active:bg-background-active ${className}`}
        >
            <HiMenu
                className={` z-10 text-secondary-500 w-5 h-5 ${
                    isCollapse ? " rotate-180" : ""
                }`}
            />
        </button>
    );
}
