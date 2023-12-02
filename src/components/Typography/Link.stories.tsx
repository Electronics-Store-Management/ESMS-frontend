import type { Meta, StoryObj } from "@storybook/react";

import Link from "./Link";

const meta = {
    title: "Components/Typography/Link",
    component: Link,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        children: { control: "text" },
    },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: "Forgot password",
    },
};
