"use client";

import { Label, TextInput as _TextInput } from "flowbite-react";
import { HTMLInputTypeAttribute } from "react";

export default function TextInput({
	title,
	icon,
	type = "text",
	placeholder = "",
	className = "",
}: PropTypes) {
	return (
		<div className={className}>
			<div className="mb-2 block">
				<Label htmlFor={title} value={title} />
			</div>
			<_TextInput
				id={title}
				type={type}
				icon={icon}
				placeholder={placeholder}
				required
			/>
		</div>
	);
}

type PropTypes = {
	title: string;
	type?: HTMLInputTypeAttribute;
	icon?: any;
	placeholder?: string;
	className?: React.ComponentProps<"div">["className"];
};
