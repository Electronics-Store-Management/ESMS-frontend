import { ReactNode } from "react";

export default function LabeledText({ title, value, icon }: PropTypes) {
    return (
        <div className=" flex flex-col gap-[3px]">
            <p className=" text-sm text-secondary-600 flex gap-1 items-center">
                {title}
            </p>
            {value ? (
                <p className=" text-secondary-950 text-base font-medium flex gap-2 items-center">
                    {icon}
                    {value}
                </p>
            ) : (
                <p className=" text-base font-normal text-secondary-600 italic flex gap-2 items-center">
                    {icon}
                    Nothing to show
                </p>
            )}
        </div>
    );
}

type PropTypes = {
    title: ReactNode;
    value: ReactNode;
    icon?: ReactNode;
};
