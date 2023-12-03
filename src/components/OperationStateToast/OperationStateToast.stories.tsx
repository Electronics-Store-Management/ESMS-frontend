import type { Meta, StoryObj } from "@storybook/react";

import OperationStateToast from "./OperationStateToast";

const meta = {
    title: "Components/Toast/OperationStateToast",
    component: OperationStateToast,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof OperationStateToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        isSuccess: true,
        title: "Success ",
        content: "Perform the task successfully",
    },
};

export const Fail: Story = {
    args: {
        isSuccess: false,
        title: "Fail task message",
        content: "Fail to perform the task",
    },
};
