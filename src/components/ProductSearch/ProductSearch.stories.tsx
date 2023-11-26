import type { Meta, StoryObj } from "@storybook/react";

import ProductSearch from "./ProductSearchUI";

const meta = {
    title: "Components/ProductSearch",
    component: ProductSearch,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        isCategoryLoading: { control: "boolean" },
        isProductLoading: { control: "boolean" },
    },
} satisfies Meta<typeof ProductSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
