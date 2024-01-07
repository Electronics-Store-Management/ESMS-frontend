import BaseEntity from "@/types/entity/BaseEntity";
import { Textarea } from "flowbite-react";
import { HiOutlineX } from "react-icons/hi";
import TextInput from "../Input/TextInput";

export default function BillProductTable<T extends Object & BaseEntity>({
    data,
    fields,
    className,
    onChange = () => {},
    onRemove,
}: PropTypes<T>) {
    function getRowItem(row: T & Object & BaseEntity, column: string) {
        return row[column as keyof T & Object & BaseEntity] as any;
    }

    return data.size ? (
        <div
            className={`flex flex-col gap-2 overflow-y-auto overflow-x-hidden ${className} `}
        >
            <div className={` flex gap-5`}>
                <p
                    className={` text-secondary-950 flex-none w-10 font-semibold`}
                >
                    ID
                </p>
                {Object.entries(fields).map(([key, { title, size }]) => (
                    <div
                        className={` text-secondary-950 font-semibold py-1`}
                        style={{
                            width: (size || 1) * 1000,
                            flexGrow: size || 1,
                        }}
                        key={title}
                    >
                        {title}
                    </div>
                ))}
                <div className=" w-10 flex-none"></div>
            </div>
            {Array.from(data.values()).map(
                (row: T & Object & BaseEntity, index) => (
                    <div key={row.id} className={` flex gap-5 items-start`}>
                        <p
                            className={` text-secondary-950 flex-none w-10 font-semibold`}
                        >
                            {index + 1}.
                        </p>
                        {Object.entries(fields).map(
                            ([
                                key,
                                {
                                    title,
                                    size,
                                    type,
                                    calculateFunc,
                                    editable,
                                    defaultValue,
                                },
                            ]) => (
                                <div
                                    style={{
                                        width: (size || 1) * 1000,
                                        flexGrow: size || 1,
                                    }}
                                    key={title}
                                >
                                    {calculateFunc || editable === false ? (
                                        <p className=" text-secondary-950 font-medium">
                                            {calculateFunc?.(row) ||
                                                getRowItem(row, key) ||
                                                0}
                                        </p>
                                    ) : type === "textarea" ? (
                                        <Textarea
                                            className={` font-normal`}
                                            value={getRowItem(row, key)}
                                            rows={Math.max(
                                                3,
                                                getRowItem(row, key)?.split("\n")
                                                    .length || 3,
                                            )}
                                            onChange={(e) =>
                                                onChange(row.id, {
                                                    ...row,
                                                    [key]: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        <TextInput
                                            type={type}
                                            className={` font-normal`}
                                            value={getRowItem(row, key)}
                                            onChange={(e) =>
                                                onChange(row.id, {
                                                    ...row,
                                                    [key]: e.target.value,
                                                })
                                            }
                                        />
                                    )}
                                </div>
                            ),
                        )}
                        <div
                            className=" w-10 h-10 flex-none grid place-items-center cursor-pointer rounded-lg hover:bg-red-50 active:bg-red-100 duration-200"
                            onClick={() => onRemove?.(row.id)}
                        >
                            <HiOutlineX className=" text-red-400" size={20} />
                        </div>
                    </div>
                ),
            )}
        </div>
    ) : (
        <p
            className={` w-full italic font-medium text-secondary-700 ${className}`}
        >
            No item selected
        </p>
    );
}

type PropTypes<T> = Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> & {
    data: Map<string, T>;
    fields: FieldTypes<T>;
    onChange?: (id: string, value: T) => any;
    onRemove?: (id: string) => any;
};

type FieldTypes<T> =
    | {
          [key: string]: BillProductCalculatedColumn<T, any>;
      }
    | { [key in keyof Partial<T>]: BillProductColumn<T[key]> };

export type BillProductColumn<FieldType> = {
    title: string;
    size?: number;
    className?: string;
    type?: "text" | "number" | "textarea";
    editable?: boolean;
    defaultValue?: FieldType;
    validateFunc?: (value: FieldType) => string;
};

export type BillProductCalculatedColumn<EntityType, FieldType> = {
    title: string;
    size?: number;
    className?: string;
    editable?: boolean;
    type?: "text" | "number" | "textarea";
    defaultValue?: FieldType;
    calculateFunc?: (row: EntityType) => any;
};
