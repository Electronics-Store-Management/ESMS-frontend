import type { Meta, StoryObj } from "@storybook/react";

import UpdateProductFormUI from "./UpdateProductFormUI";

const meta = {
    title: "Components/Form/UpdateProductFormUI",
    component: UpdateProductFormUI,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof UpdateProductFormUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isLoading: true,
    },
};
