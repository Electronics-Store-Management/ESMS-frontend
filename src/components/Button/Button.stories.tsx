import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta = {
	title: "Components/Item/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		fill: { control: "boolean" },
		size: { options: ["xs", "sm", "md", "lg"], control: { type: "select" } },
		children: { control: "text" },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		btnType: "primary",
		children: "Button",
	},
};

export const Secondary: Story = {
	args: {
		btnType: "secondary",
		children: "Button",
	},
};

export const Error: Story = {
	args: {
		btnType: "error",
		children: "Button",
	},
};
