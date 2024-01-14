import { withoutQuery } from "@/utils/withQuery";
import { Badge, BadgeProps, CustomFlowbiteTheme } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiFilter, HiSearch, HiOutlineX } from "react-icons/hi";

export default function FilterBadge({
    title,
    searchParamName,
    type,
    onClick = () => {},
    onClose = () => {},
    ...props
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
            {...props}
            theme={customBadgeThem}
        >
            <div className=" flex gap-2 items-end">
                <p className=" text-sm">
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
        base: "flex w-fit h-fit items-center gap-1 font-semibold",
        color: {
            gray: "bg-secondary-100 text-secondary-800 group-hover:bg-gray-200 ",
            info: "bg-primary-100 text-primary-700 group-hover:bg-cyan-200 ",
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

type PropTypes = BadgeProps & {
    title: string;
    searchParamName: string;
    type: FilterBadgeType;
    onClose?: () => any;
    onClick?: () => any;
};

type FilterBadgeType = "search" | "filter";
