import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import TimeLineList from "../TimeLineList";

import { isMobile } from "react-device-detect";

export default function Layout({
    children,
    params: { id, revisionId },
}: ReactNodeChildren & {
    params: { id: string; revisionId: string };
}) {
    return (
        <>
            {isMobile ? null : (
                <div className=" flex-none xl:max-h-full h-fit pl-1 pr-8 pb-2 overflow-x-hidden xl:overflow-y-auto">
                    <TimeLineList supplierId={id} />
                </div>
            )}
            {children}
        </>
    );
}
