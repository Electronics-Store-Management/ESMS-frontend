import type { Meta, StoryObj } from "@storybook/react";

import SideBar from "./SideBar";

const meta = {
    title: "Components/Item/SideBar",
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
    args: {
        staffInfo: {
            name: "",
            phone: "",
            email: "",
            role: "ADMIN",
            lastOnline: "",
            citizenId: "",
            accountNonExpired: false,
            credentialsNonExpired: false,
            accountNonLocked: false,
            enabled: false,
            id: "",
        },
    },
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
    args: {
        staffInfo: {
            name: "",
            phone: "",
            email: "",
            role: "ADMIN",
            lastOnline: "",
            citizenId: "",
            accountNonExpired: false,
            credentialsNonExpired: false,
            accountNonLocked: false,
            enabled: false,
            id: "",
        },
    },
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: "/product",
            },
        },
    },
};

export const Imports: Story = {
    args: {
        staffInfo: {
            name: "",
            phone: "",
            email: "",
            role: "ADMIN",
            lastOnline: "",
            citizenId: "",
            accountNonExpired: false,
            credentialsNonExpired: false,
            accountNonLocked: false,
            enabled: false,
            id: "",
        },
    },
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: "/import_bill",
            },
        },
    },
};
