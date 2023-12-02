import type { Meta, StoryObj } from "@storybook/react";

import FilterBadge from "./FilterBadge";

const meta = {
    title: "Components/Filter/FilterBadge",
    component: FilterBadge,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text" },
        searchParamName: { control: "text" },
        type: {
            options: ["search", "filter"],
            control: "radio",
        },
    },
} satisfies Meta<typeof FilterBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        title: "Product name",
        searchParamName: "category_name",
        type: "search",
    },
};
