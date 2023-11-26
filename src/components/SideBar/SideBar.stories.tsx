import type { Meta, StoryObj } from "@storybook/react";

import SideBar from "./SideBar";

const meta = {
    title: "Components/SideBar",
    component: SideBar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
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

export const Products: Story = {
    args: {},
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: "/product",
            },
        },
    },
};
