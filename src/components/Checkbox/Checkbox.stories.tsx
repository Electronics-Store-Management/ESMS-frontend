import type { Meta, StoryObj } from "@storybook/react";

import CheckBox from "./CheckBox";

const meta = {
	title: "Components/Item/CheckBox",
	component: CheckBox,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: { options: ["xs", "sm", "md", "lg"], control: { type: "select" } },
		children: { control: "text" },
	},
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		id: "remember",
		children: "Remember password",
	},
};
