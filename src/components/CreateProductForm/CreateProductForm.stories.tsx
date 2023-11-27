import type { Meta, StoryObj } from "@storybook/react";

import CreateProductForm from "./CreateProductForm";

const meta = {
    title: "Components/CreateProductForm",
    component: CreateProductForm,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof CreateProductForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
