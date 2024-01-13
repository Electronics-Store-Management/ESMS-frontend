import { ReactNode } from "react";

export default function Layout(props: {
    basicInfo: ReactNode;
    staff: ReactNode;
    customer: ReactNode;
}) {
    return (
        <div className=" w-1/3 overflow-auto py-5 px-8 flex flex-col gap-3 rounded-lg border-[1px] border-secondary-200">
            <div className=" grid gap-1">
                <p className=" font-semibold text-sm">Customer</p>
                {props.customer}
            </div>
            <div className=" grid gap-1">
                <p className=" font-semibold text-sm">Staff</p>
                {props.staff}
            </div>
            <hr />
            <div className="mt-3">{props.basicInfo}</div>
        </div>
    );
}
