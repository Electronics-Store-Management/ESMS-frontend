import type { Meta, StoryObj } from "@storybook/react";

import OperationStatusModal from "./OperationStatusModal";

const meta = {
    title: "Components/OperationStatusModal",
    component: OperationStatusModal,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof OperationStatusModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        state: "success",
        success: "Delete successfully",
    },
};

export const Fail: Story = {
    args: {
        state: "fail",
        fail: "Fail to delete",
    },
};
