import type { Meta, StoryObj } from "@storybook/react";

import ClaimModal from "./ClaimModal";

const meta = {
    title: "Components/ClaimModal",
    component: ClaimModal,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof ClaimModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        itemName: (
            <span>
                {" "}
                product <b>San pham</b>
            </span>
        ),
        openModal: true,
    },
};
