import { withoutQuery } from "@/utils/withQuery";
import { Badge, CustomFlowbiteTheme } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiFilter, HiSearch, HiOutlineX } from "react-icons/hi";

export default function FilterBadge({
    title,
    searchParamName,
    type,
    onClick = () => {},
    onClose = () => {},
}: PropTypes) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const content = searchParams.get(searchParamName) || "";

    return content ? (
        <Badge
            onClick={onClick}
            size="sm"
            {...badgeStyle[type]}
            theme={customBadgeThem}
        >
            <div className=" flex gap-2 items-end">
                <p>
                    {title} = {content}
                </p>
                <HiOutlineX
                    onClick={() => {
                        router.push(
                            withoutQuery(
                                pathname,
                                [searchParamName],
                                searchParams,
                            ),
                        );
                        onClose();
                    }}
                    className=" w-5 h-5 p-[2px] mb-[0px] rounded-full transition duration-200 cursor-pointer hover:bg-background-normal"
                />
            </div>
        </Badge>
    ) : null;
}

const badgeStyle: {
    [key in FilterBadgeType]: { icon: any; color: string };
} = {
    search: {
        icon: HiSearch,
        color: "info",
    },
    filter: {
        icon: HiFilter,
        color: "gray",
    },
};

const customBadgeThem: CustomFlowbiteTheme["badge"] = {
    root: {
        base: "flex h-fit items-center gap-1 font-semibold",
        color: {
            info: "bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300",
            gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600",
            failure:
                "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-300",
            success:
                "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-300",
            warning:
                "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-300",
            indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-300",
            purple: "bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-300",
            pink: "bg-pink-100 text-pink-800 dark:bg-pink-200 dark:text-pink-900 group-hover:bg-pink-200 dark:group-hover:bg-pink-300",
            blue: "bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-900 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300",
            cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-900 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300",
            dark: "bg-gray-600 text-gray-100 dark:bg-gray-900 dark:text-gray-200 group-hover:bg-gray-500 dark:group-hover:bg-gray-700",
            light: "bg-gray-200 text-gray-800 dark:bg-gray-400 dark:text-gray-900 group-hover:bg-gray-300 dark:group-hover:bg-gray-500",
            green: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-300",
            lime: "bg-lime-100 text-lime-800 dark:bg-lime-200 dark:text-lime-900 group-hover:bg-lime-200 dark:group-hover:bg-lime-300",
            red: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-300",
            teal: "bg-teal-100 text-teal-800 dark:bg-teal-200 dark:text-teal-900 group-hover:bg-teal-200 dark:group-hover:bg-teal-300",
            yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-300",
        },
        href: "group",
        size: {
            xs: "p-1 text-xs",
            sm: "p-1.5 text-sm",
        },
    },
    icon: {
        off: "rounded px-2 py-0.5",
        on: "rounded-full p-1.5",
        size: {
            xs: "w-3 h-3",
            sm: "w-3.5 h-3.5",
        },
    },
};

type PropTypes = {
    title: string;
    searchParamName: string;
    type: FilterBadgeType;
    onClose?: () => any;
    onClick?: () => any;
};

type FilterBadgeType = "search" | "filter";
