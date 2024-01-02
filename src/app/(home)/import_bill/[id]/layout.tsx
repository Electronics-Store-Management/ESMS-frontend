import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { ReactNode } from "react";

export default function Layout(props: {
    basicInfo: ReactNode;
    historyInfo: ReactNode;
    staff: ReactNode;
    supplier: ReactNode;
}) {
    return (
        <div className=" col-span-2 overflow-auto p-5 flex flex-col gap-3 rounded-lg border-[1px] border-secondary-200">
            {props.supplier}
            {props.staff}
            {props.basicInfo}
        </div>
    );
}
