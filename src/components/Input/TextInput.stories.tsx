import type { Meta, StoryObj } from "@storybook/react";
import { HiUser, HiOutlineX, HiOutlineSearch } from "react-icons/hi";

import TextInput from "./TextInput";

const meta = {
    title: "Components/Item/TextInput",
    component: TextInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        type: {
            options: ["text", "email", "number", "password"],
            control: "select",
        },
    },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        title: "Your email",
        placeholder: "Enter your email here",
        sizing: "md",
    },
};

export const WithIcon: Story = {
    args: {
        icon: HiUser,
        title: "Your email",
        placeholder: "Enter your email here",
    },
};

export const WithRightIcon: Story = {
    args: {
        rightIcon: HiOutlineX,
        title: "Your email",
        placeholder: "Enter your email here",
    },
};

export const WithAddon: Story = {
    args: {
        addon: (
            <div>
                <HiOutlineSearch />
            </div>
        ),
        title: "Your email",
        placeholder: "Enter your email here",
    },
};

export const WithRightAddon: Story = {
    args: {
        rightAddon: (
            <div>
                <HiOutlineSearch />
            </div>
        ),
        title: "Your email",
        placeholder: "Enter your email here",
    },
};
