import type { Meta, StoryObj } from "@storybook/react";

import StringSkeleton from "./StringSkeleton";

const meta = {
    title: "Components/Skeleton/StringSkeleton",
    component: StringSkeleton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof StringSkeleton>;

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
