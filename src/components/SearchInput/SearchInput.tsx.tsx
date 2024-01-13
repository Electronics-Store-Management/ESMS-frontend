"use client";

import { ReactNode, useState } from "react";
import { QueryFunction, useQuery } from "react-query";
import { useDebounce } from "react-use";
import TextInput from "../Input/TextInput";
import Loading from "../Loading/Loading";
import { IoMdClose } from "react-icons/io";

export default function SearchInput<T>({
    title,
    placeholder,
    queryInfo: { queryKeys, queryFunc },
    onSelect,
    toggleCreating,
    className,
    template,
    ...props
}: PropTypes<T>) {
    const [searchText, setSearchText] = useState("");
    const [querySearchText, setQuerySearchText] = useState("");
    useDebounce(() => setQuerySearchText(searchText), 200, [searchText]);

    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading, isFetched } = useQuery<any[]>(
        [...queryKeys, querySearchText],
        queryFunc,
        { enabled: querySearchText !== "" },
    );

    return (
        <div className={`relative ${className}`} {...props}>
            <TextInput
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 300)}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                title={title}
                rightIcon={
                    searchText ? (
                        <IoMdClose className=" text-secondary-950" size={20} />
                    ) : undefined
                }
                onRightIconClick={() => setSearchText("")}
                placeholder={placeholder}
                sizing="md"
            />
            {isOpen ? (
                <div className=" w-full text-start absolute -bottom-2 translate-y-full bg-background-normal z-50 shadow-lg rounded-md">
                    {toggleCreating && searchText != "" ? (
                        <p
                            onClick={() => {
                                toggleCreating(searchText);
                                setSearchText("");
                                setQuerySearchText("");
                            }}
                            className=" px-3 py-2 text-secondary-950 text-sm hover:bg-background-hover transition-all duration-200 cursor-pointer"
                        >
                            {`Create "${searchText}"`}
                        </p>
                    ) : null}
                    {!isLoading ? (
                        data?.length ? (
                            data?.map((item) =>
                                template ? (
                                    <div
                                        key={item.id}
                                        className="hover:bg-background-hover transition-all duration-200 cursor-pointer"
                                        onClick={() => {
                                            setSearchText("");
                                            onSelect?.(item);
                                        }}
                                    >
                                        {template(item)}
                                    </div>
                                ) : (
                                    <div
                                        className=" px-3 py-2 text-secondary-950 text-sm hover:bg-background-hover transition-all duration-200 cursor-pointer"
                                        onClick={() => {
                                            setSearchText("");
                                            onSelect?.(item);
                                        }}
                                        key={item.id}
                                    >
                                        {item.name}
                                    </div>
                                ),
                            )
                        ) : isFetched ? (
                            <>
                                <p className=" px-3 py-3 text-secondary-950 text-sm italic transition-all duration-200">
                                    No item found
                                </p>
                            </>
                        ) : null
                    ) : (
                        <Loading size="sm" className=" p-3" />
                    )}
                </div>
            ) : null}
        </div>
    );
}

type PropTypes<T> = Omit<React.ComponentPropsWithoutRef<"div">, "onSelect"> & {
    title?: string;
    placeholder: string;
    queryInfo: {
        queryKeys: any[];
        queryFunc: QueryFunction<T[]>;
    };
    template?: (value: T) => ReactNode;
    onSelect?: (item: any) => any;
    toggleCreating?: (value: string) => any;
};
