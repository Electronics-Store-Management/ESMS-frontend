import type { Meta, StoryObj } from "@storybook/react";

import TableSkeleton from "./TableSkeleton";

const meta = {
    title: "Components/Skeleton/TableSkeleton",
    component: TableSkeleton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof TableSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: "/home",
            },
        },
    },
};
