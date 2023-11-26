import BaseEntity from "@/types/entity/BaseEntity";
import { CustomFlowbiteTheme, Dropdown, Table } from "flowbite-react";
import { HiOutlineDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import Button from "../Button/Button";
import FONT from "@/utils/fontFamily";

export default function CheckboxTable<T extends BaseEntity>({
    data,
    pick,
    className,
    onEdit = () => {},
    onDelete = () => {},
    ...props
}: PropTypes<T>) {
    return (
        <div className={`overflow-x-auto ${className}`} {...props}>
            <Table theme={tableTheme} hoverable>
                <Table.Head theme={tableTheme?.head}>
                    <Table.HeadCell
                        theme={tableTheme?.head?.cell}
                        className={` w-10`}
                    >
                        STT
                    </Table.HeadCell>
                    {Object.values<Column>(pick).map((column) => (
                        <Table.HeadCell
                            theme={tableTheme?.head?.cell}
                            key={column.title}
                        >
                            {column.title}
                        </Table.HeadCell>
                    ))}
                    <Table.HeadCell
                        theme={tableTheme?.head?.cell}
                        className={` w-10`}
                    >
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {data.map((row, index) => (
                        <Table.Row
                            key={row.id}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell
                                theme={{
                                    base: "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-4 py-4 text-center text-secondary-900 font-semibold",
                                }}
                            >
                                {index + 1}
                            </Table.Cell>
                            {Object.keys(pick).map((column) => (
                                <Table.Cell
                                    key={`${row.id}_${column}`}
                                    theme={{
                                        base: `${
                                            tableTheme?.body?.cell?.base
                                        } ${
                                            pick[column as keyof typeof row]
                                                .className || ""
                                        }`,
                                    }}
                                >
                                    {pick[column as keyof typeof row].mapper?.(
                                        row[column as keyof typeof row],
                                    ) ||
                                        (row[
                                            column as keyof typeof row
                                        ] as string)}
                                </Table.Cell>
                            ))}
                            <Table.Cell theme={tableTheme?.body?.cell}>
                                <Dropdown
                                    label=""
                                    renderTrigger={() => (
                                        <div>
                                            <Button btnType="secondary">
                                                <HiOutlineDotsVertical className=" w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                    dismissOnClick={false}
                                >
                                    <Dropdown.Item
                                        icon={HiPencil}
                                        onClick={() => onEdit(row)}
                                    >
                                        Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        theme={{
                                            icon: " text-red-600 mr-2 h-4 w-4",
                                        }}
                                        icon={HiTrash}
                                        onClick={() => onDelete(row)}
                                    >
                                        <p className=" text-red-600">Delete</p>
                                    </Dropdown.Item>
                                </Dropdown>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

const tableTheme: CustomFlowbiteTheme["table"] = {
    root: {
        base: "w-full text-left rounded-lg text-sm text-secondary-500",
        shadow: "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
        wrapper: "relative rounded-lg border-[1px] border-secondary-200",
    },
    body: {
        base: "group/body",
        cell: {
            base: `group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-4 py-4 font-semibold text-secondary-900 ${FONT.primary.className}`,
        },
    },
    head: {
        base: "group/head text-xs border-b-2 border-secondary-200 uppercase text-gray-700",
        cell: {
            base: "group-first/head:first:rounded-tl-lg border-b-[1px] border-secondary-200  group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-4 py-4",
        },
    },
    row: {
        base: "group/row",
        hovered: "hover:bg-secondary-100",
        striped:
            "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
    },
};

type PropTypes<T> = {
    data: T[];
    onEdit?: (id: T) => any;
    onDelete?: (id: T) => any;
    pick: { [key in keyof Partial<T>]: Column };
} & React.ComponentPropsWithoutRef<"div">;

type Column = {
    title?: string;
    size?: number;
    className?: string;
    mapper?: (value: any) => any;
};
