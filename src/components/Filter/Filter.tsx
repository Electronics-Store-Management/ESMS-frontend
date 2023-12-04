import { CustomFlowbiteTheme, Dropdown, Spinner } from "flowbite-react";
import { HiOutlineCheck } from "react-icons/hi";
import FONT from "../../utils/fontFamily";

export default function Filter({
    title,
    items = [],
    onClick = () => {},
    onItemChange = (item: string) => {},
    isLoading = false,
    choosen = "",
    className,
    ...props
}: PropTypes) {
    return (
        <div className={` flex items-center gap-2 ${className}`} {...props}>
            <p
                className={`${FONT.primary.className} font-bold text-[14px] text-secondary-900`}
            >
                {title}
            </p>
            <Dropdown
                theme={dropdownTheme}
                label={
                    <p className=" whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px]">
                        {choosen || "All"}
                    </p>
                }
                dismissOnClick={true}
                onClick={onClick}
                size="sm"
            >
                {isLoading ? (
                    <div className=" my-2 flex gap-2 justify-center items-center px-4 py-1">
                        <Spinner size="sm" />
                        <p className=" text-sm text-secondary-900">
                            Loading...
                        </p>
                    </div>
                ) : (
                    <>
                        {items.map((value) => (
                            <Dropdown.Item
                                theme={dropdownTheme?.floating?.item}
                                onClick={() => onItemChange(value)}
                                key={value}
                                icon={value === choosen ? HiOutlineCheck : null}
                            >
                                <p className=" w-full text-start">{value}</p>
                            </Dropdown.Item>
                        ))}
                        <Dropdown.Item
                            theme={dropdownTheme?.floating?.item}
                            onClick={() => onItemChange(undefined || "")}
                            icon={choosen ? null : HiOutlineCheck}
                        >
                            <p className="  w-full text-start font-medium text-primary-300">
                                All
                            </p>
                        </Dropdown.Item>
                    </>
                )}
            </Dropdown>
        </div>
    );
}

const dropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "ml-2 h-4 w-4 text-secondary-950",
    content: "py-1 text-secondary-900 focus:outline-none",
    floating: {
        animation: "transition-opacity",
        arrow: {
            base: "absolute z-10 h-2 w-2 rotate-45",
            style: {
                light: "bg-secondary-900",
                auto: "bg-secondary-900",
            },
            placement: "-4px",
        },
        base: "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
        content: "py-1 text-sm text-gray-700",
        divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
        header: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
        hidden: "invisible opacity-0",
        item: {
            container: " w-[180px]",
            base: "flex flex-row-reverse items-center justify-between py-2 px-4 text-sm text-secondary-800 cursor-pointer w-full hover:bg-secondary-100 focus:bg-secondary-100 ",
            icon: "mr-2 justify-self-end h-5 w-5",
        },
        style: {
            light: "border border-secondary-200 bg-white text-secondary-900",
            auto: "border border-secondary-200 bg-white text-secondary-900",
        },
        target: " max-w-[250px] w-max border-2 border-surface-grey02 text-ellipsis flex bg-surface-grey01 text-secondary-950 transition duration-200 enabled:hover:bg-primary-200 enabled:active:bg-primary-300",
    },
    inlineWrapper: "flex w-full items-center justify-between",
};

type PropTypes = {
    title: string;
    items?: string[];
    choosen?: string;
    onClick?: () => any;
    onItemChange?: (item: string) => any;
    isLoading?: boolean;
} & Omit<React.ComponentPropsWithoutRef<"div">, "onClick">;
