import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { ReactNode } from "react";

export default function Layout(props: {
    basicInfo: ReactNode;
    historyInfo: ReactNode;
    staff: ReactNode;
    supplier: ReactNode;
}) {
    return (
        <div className=" w-1/3 overflow-auto py-5 px-8 flex flex-col gap-3 rounded-lg border-[1px] border-secondary-200">
            {props.supplier}
            {props.staff}
            <div className="mt-3">{props.basicInfo}</div>
        </div>
    );
}
