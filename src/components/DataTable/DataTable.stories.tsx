import type { Meta, StoryObj } from "@storybook/react";

import DataTable, { Column } from "./DataTable";
import StaffTouch from "@/types/entity/StaffTouch";
import BaseEntity from "@/types/entity/BaseEntity";

const meta = {
    title: "Components/Table/DataTable",
    component: DataTable,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text" },
        content: { control: "text" },
    },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        data: [
            { id: "1", name: "Product 1", description: "Description" },
            { id: "2", name: "Product 2", description: "Description" },
            { id: "3", name: "Product 2", description: "Description" },
        ] as DemoType[],
        //@ts-ignore
        pick: {
            name: { title: "Name" },
            description: {
                title: "Description",
                className: " font-normal text-secondary-500",
            },
        } as { [key in keyof Partial<DemoType>]: Column<DemoType[key]> },
    },
};

type DemoType = BaseEntity & {
    name: string;
    description: string;
};
