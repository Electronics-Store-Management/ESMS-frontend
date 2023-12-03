import type { Meta, StoryObj } from "@storybook/react";

import CreateProductFormUI from "./CreateProductFormUI";

const meta = {
    title: "Components/Form/CreateProductFormUI",
    component: CreateProductFormUI,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof CreateProductFormUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
