"use client";

import { Label, TextInput as _TextInput } from "flowbite-react";
import React, { ForwardedRef } from "react";
import { HTMLInputTypeAttribute } from "react";

export default React.forwardRef(function TextInput(
	{
		title,
		icon,
		type = "text",
		placeholder = "",
		className = "",
		...props
	}: PropTypes,
	ref: ForwardedRef<HTMLInputElement>
) {
	return (
		<div className={className} {...props}>
			<div className="mb-2 block">
				<Label htmlFor={title} value={title} />
			</div>
			<_TextInput
				ref={ref}
				id={title}
				type={type}
				icon={icon}
				placeholder={placeholder}
				required
			/>
		</div>
	);
});

type PropTypes = {
	title: string;
	type?: HTMLInputTypeAttribute;
	icon?: any;
	placeholder?: string;
} & React.ComponentPropsWithRef<"input">;
