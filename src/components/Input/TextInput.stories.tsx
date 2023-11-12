import type { Meta, StoryObj } from "@storybook/react";

import TextInput from "./TextInput";

const meta = {
	title: "Components/TextInput",
	component: TextInput,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			options: ["text", "email", "number", "password"],
			control: "select",
		},
	},
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		title: "Your email",
		placeholder: "Enter your email here",
	},
};
