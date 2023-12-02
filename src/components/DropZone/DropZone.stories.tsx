import type { Meta, StoryObj } from "@storybook/react";

import DropZone from "./DropZone";

const meta = {
    title: "Components/Form/Item/DropZone",
    component: DropZone,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
