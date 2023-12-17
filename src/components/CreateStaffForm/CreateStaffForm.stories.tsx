import type { Meta, StoryObj } from "@storybook/react";

import CreateStaffFormUI from "./CreateStaffFormUI";

const meta = {
    title: "Components/Form/CreateStaffFormUI",
    component: CreateStaffFormUI,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof CreateStaffFormUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
