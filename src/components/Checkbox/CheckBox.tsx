import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { Checkbox, Label, CustomFlowbiteTheme } from "flowbite-react";

export default function CheckBox({
	children,
	id,
	defaultChecked = false,
}: PropTypes) {
	return (
		<div className="flex items-center gap-2">
			<Checkbox theme={theme} id={id} defaultChecked={defaultChecked} />
			<Label htmlFor={id} className="flex">
				{children}
			</Label>
		</div>
	);
}

const theme: CustomFlowbiteTheme["checkbox"] = {
	root: {
		base: "h-4 w-4 rounded focus:ring-2 border border-secondary-300 bg-white",
		color: {
			default: "focus:ring-primary-400 text-primary-400",
		},
	},
};

type PropTypes = {
	id: string;
	defaultChecked?: boolean;
} & ReactNodeChildren;
