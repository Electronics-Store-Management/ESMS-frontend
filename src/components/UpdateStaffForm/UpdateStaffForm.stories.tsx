import type { Meta, StoryObj } from "@storybook/react";

import UpdateStaffFormUI from "./UpdateStaffFormUI";

const meta = {
    title: "Components/Form/UpdateStaffFormUI",
    component: UpdateStaffFormUI,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof UpdateStaffFormUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
