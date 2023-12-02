import type { Meta, StoryObj } from "@storybook/react";

import Filter from "./Filter";
import withQuery from "../../utils/withQuery";
import SEARCH_PARAMS from "../../constants/searchParams";

const meta = {
    title: "Components/Filter/Filter",
    component: Filter,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        title: "Category",
        items: ["Category 1", "Category 2"],
    },
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: withQuery("/product", {
                    [SEARCH_PARAMS.productName]: "Name",
                }),
            },
        },
    },
};
