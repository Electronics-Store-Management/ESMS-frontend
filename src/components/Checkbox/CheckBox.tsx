import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { Checkbox, Label, CustomFlowbiteTheme } from "flowbite-react";

export default function CheckBox({
    children,
    id,
    defaultChecked = false,
    className,
    ref,
    ...props
}: PropTypes) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Checkbox
                theme={theme}
                id={id}
                defaultChecked={defaultChecked}
                {...props}
            />
            <Label htmlFor={id} className="flex text-secondary-900">
                {children}
            </Label>
        </div>
    );
}

const theme: CustomFlowbiteTheme["checkbox"] = {
    root: {
        base: "h-4 w-4 rounded focus:ring-2 border border-secondary-300 bg-white focus:ring-0 focus:ring-offset-0",
        color: {
            default: "focus:ring-primary-400 text-primary-400",
        },
    },
};

type PropTypes = {
    id: string;
    defaultChecked?: boolean;
} & ReactNodeChildren &
    React.ComponentPropsWithRef<"input">;

