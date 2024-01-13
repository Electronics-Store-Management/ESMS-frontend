"use client";

import { Dropdown, Table } from "flowbite-react";
import { HiOutlineDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import Button from "../Button/Button";
import { Column, tableTheme } from "./DataTable";
import { usePermission } from "@/hooks/usePermission";
import {
    EntityType,
    PermissionTypeList,
} from "@/types/entity/PermissionResponse";

export function Row<T>({
    entityType,
    row,
    isEdit,
    index,
    pick,
    onClickRow,
    onEdit,
    onDelete,
}: {
    entityType?: EntityType;
    row: any;
    isEdit: boolean;
    index: number;
    pick: { [key in keyof Partial<T>]: Column<T[key]> };
    onClickRow?: (row?: any) => any;
    onEdit?: (row?: any) => any;
    onDelete?: (row?: any) => any;
}) {
    const isAllowedEdit = usePermission(
        entityType,
        ["UPDATE_ALL", "UPDATE_ITEM"],
        [row.id],
    );
    const isAllowedDelete = usePermission(
        entityType,
        ["DELETE_ALL", "DELETE_ITEM"],
        [row.id],
    );
    const isAllowedView = usePermission(entityType, PermissionTypeList, [
        row.id,
    ]);

    return isAllowedView ? (
        <Table.Row
            key={row.id}
            className="bg-white cursor-pointer hover:bg-primary-100 duration-100"
            onClick={() => onClickRow?.(row)}
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
                        base: `${tableTheme?.body?.cell?.base} ${
                            //@ts-ignore
                            pick[column as keyof typeof row].className || ""
                        }`,
                    }}
                >
                    {
                        //@ts-ignore
                        pick[column as keyof typeof row].editable ? (
                            <input
                                defaultValue={
                                    //@ts-ignore
                                    pick[column as keyof typeof row].mapper?.(
                                        row[column as keyof typeof row],
                                    ) ||
                                    (row[column as keyof typeof row] as string)
                                }
                            />
                        ) : (
                            //@ts-ignore
                            pick[column as keyof typeof row].mapper?.(
                                row[column as keyof typeof row],
                            ) || (row[column as keyof typeof row] as string)
                        )
                    }
                </Table.Cell>
            ))}
            {isEdit && (isAllowedDelete || isAllowedEdit) ? (
                <Table.Cell
                    theme={tableTheme?.body?.cell}
                    onClick={(e) => e.preventDefault()}
                >
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
                        {isAllowedEdit ? (
                            <Dropdown.Item
                                icon={HiPencil}
                                onClick={() => onEdit?.(row)}
                            >
                                Edit
                            </Dropdown.Item>
                        ) : null}
                        {isAllowedDelete ? (
                            <Dropdown.Item
                                theme={{
                                    icon: " text-red-600 mr-2 h-4 w-4",
                                }}
                                icon={HiTrash}
                                onClick={() => onDelete?.(row)}
                            >
                                <p className=" text-red-600">Delete</p>
                            </Dropdown.Item>
                        ) : null}
                    </Dropdown>
                </Table.Cell>
            ) : null}
        </Table.Row>
    ) : null;
}
