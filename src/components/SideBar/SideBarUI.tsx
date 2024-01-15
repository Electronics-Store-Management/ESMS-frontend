"use client";

import { Avatar, CustomFlowbiteTheme, Dropdown, Sidebar } from "flowbite-react";
import Image from "next/image";
import { AiFillCustomerService } from "react-icons/ai";
import {
    HiBookmark,
    HiChartPie,
    HiChevronLeft,
    HiClipboardCheck,
    HiDocumentSearch,
    HiMenu,
    HiSave,
    HiShoppingBag,
    HiUserGroup,
} from "react-icons/hi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { PiTruckDuotone } from "react-icons/pi";
import { RiToolsLine } from "react-icons/ri";

import COOKIE_NAME from "@/constants/cookies";
import useScreen from "@/hooks/useScreen";
import Staff from "@/types/entity/Staff";
import { deleteCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import LOGO from "../../assets/logo.png";
import LOGO_TET from "../../assets/logo-tet.png";
import FONT from "../../utils/fontFamily";

import { useSideBarState } from "@/contexts/SideBar";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function SideBarUI({
    staffInfo,
    isCollapse: _isCollapse,
}: PropTypes) {
    const router = useRouter();
    const pathname = usePathname();
    const routeName = (pathname.split("/").at(1) || "") + "/";
    const screen = useScreen();
    const isMobile = !screen("md");

    const { theme } = useTheme();

    const { isCollapse, setIsCollapse } = useSideBarState((state) => ({
        isCollapse:
            state.isCollapse === undefined ? _isCollapse : state.isCollapse,
        setIsCollapse: state.setIsCollapse,
    }));

    useEffect(() => {
        setIsCollapse(_isCollapse);
    }, [_isCollapse]);

    useEffect(() => {
        setCookie(COOKIE_NAME.SIDE_BAR_COLLAPSE, isCollapse);
    }, [isCollapse]);

    return (
        // <div className={`w-screen sm:w-fit h-screen`}>
        <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-screen w-fit duration-300 transition-all"
        >
            <Transition show={!isMobile || !isCollapse} className=" w-fit z-20">
                <Transition.Child
                    enter="transition-opacity ease-linear duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {isMobile && (
                        <div
                            onClick={() => {
                                if (isMobile && !isCollapse) {
                                    setIsCollapse((prev) => !prev);
                                }
                            }}
                            className=" absolute top-0 left-0 opacity-70 w-screen h-screen bg-zinc-900"
                        />
                    )}
                </Transition.Child>
                <Transition.Child
                    className=" h-screen relative z-20"
                    enter="transition ease-in-out duration-500 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-500 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsCollapse((prev) => !prev);
                        }}
                        className={` w-fit z-10 right-2 transition-all duration-300 absolute rounded-md border-0 p-1 top-6 bg-background-normal active:shadow-md active:bg-background-active ${
                            isMobile || " hidden"
                        }`}
                    >
                        <HiChevronLeft
                            className={` z-10 text-secondary-300 w-6 h-6`}
                        />
                    </button>
                    <Sidebar
                        theme={sideBarTheme}
                        collapsed={!isMobile && isCollapse}
                        aria-label="Sidebar with multi-level dropdown example"
                        className=" relative z-0"
                    >
                        <div className=" flex gap-2 pl-1 pt-2 mb-12">
                            <Image
                                src={theme == "holiday" ? LOGO_TET : LOGO}
                                width={30}
                                height={30}
                                alt="logo"
                            />
                            {isCollapse ? null : (
                                <h1
                                    className={` ml-3 text-2xl text-secondary-950 font-semibold ${FONT.inter.className}`}
                                >
                                    ESMS
                                </h1>
                            )}
                        </div>
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                <Sidebar.Item
                                    theme={sideBarTheme?.item}
                                    active={routeName === ROUTES.home}
                                    href={ROUTES.home}
                                    icon={HiChartPie}
                                >
                                    Dashboard
                                </Sidebar.Item>
                                <Sidebar.Collapse
                                    theme={sideBarTheme?.collapse}
                                    href={isCollapse ? ROUTES.product : ""}
                                    open={
                                        [
                                            ROUTES.category,
                                            ROUTES.product,
                                        ].includes(routeName) && !isCollapse
                                    }
                                    icon={HiShoppingBag}
                                    label="Product"
                                >
                                    <Sidebar.Item
                                        active={routeName === ROUTES.product}
                                        theme={sideBarCollapsedItemTheme?.item}
                                        href={ROUTES.product}
                                        icon={HiDocumentSearch}
                                    >
                                        Product List
                                    </Sidebar.Item>
                                    <Sidebar.Item
                                        active={routeName === ROUTES.category}
                                        theme={sideBarCollapsedItemTheme?.item}
                                        href={ROUTES.category}
                                        icon={HiBookmark}
                                    >
                                        Category
                                    </Sidebar.Item>
                                </Sidebar.Collapse>
                                <Sidebar.Item
                                    active={routeName === ROUTES.supplier}
                                    theme={sideBarCollapsedItemTheme?.item}
                                    href={ROUTES.supplier}
                                    icon={PiTruckDuotone}
                                >
                                    Supplier
                                </Sidebar.Item>
                                <Sidebar.Item
                                    active={routeName === ROUTES.customer}
                                    theme={sideBarCollapsedItemTheme?.item}
                                    href={ROUTES.customer}
                                    icon={AiFillCustomerService}
                                >
                                    Customer
                                </Sidebar.Item>
                                <Sidebar.Item
                                    active={routeName === ROUTES.staff}
                                    theme={sideBarCollapsedItemTheme?.item}
                                    href={ROUTES.staff}
                                    icon={HiUserGroup}
                                >
                                    Staff
                                </Sidebar.Item>
                                <Sidebar.Collapse
                                    theme={sideBarTheme?.collapse}
                                    href={isCollapse ? ROUTES.import : ""}
                                    open={
                                        [
                                            ROUTES.category,
                                            ROUTES.import,
                                        ].includes(routeName) && !isCollapse
                                    }
                                    icon={HiClipboardCheck}
                                    label="Import"
                                >
                                    <Sidebar.Item
                                        active={
                                            routeName === ROUTES.import_bill
                                        }
                                        theme={sideBarCollapsedItemTheme?.item}
                                        href={ROUTES.import_bill}
                                        icon={LiaFileInvoiceDollarSolid}
                                    >
                                        Invoices
                                    </Sidebar.Item>
                                    <Sidebar.Item
                                        active={routeName === ROUTES.import}
                                        theme={sideBarCollapsedItemTheme?.item}
                                        href={ROUTES.import}
                                        icon={HiSave}
                                    >
                                        Import goods
                                    </Sidebar.Item>
                                </Sidebar.Collapse>
                                <Sidebar.Collapse
                                    theme={sideBarTheme?.collapse}
                                    href={isCollapse ? ROUTES.sale : ""}
                                    open={
                                        [
                                            ROUTES.sale_invoice,
                                            ROUTES.sale,
                                        ].includes(routeName) && !isCollapse
                                    }
                                    icon={MdOutlineCurrencyExchange}
                                    label="Export"
                                >
                                    <Sidebar.Item
                                        active={
                                            routeName === ROUTES.sale_invoice
                                        }
                                        theme={sideBarCollapsedItemTheme?.item}
                                        href={ROUTES.sale_invoice}
                                        icon={LiaFileInvoiceDollarSolid}
                                    >
                                        Invoices
                                    </Sidebar.Item>
                                    <Sidebar.Item
                                        active={routeName === ROUTES.sale}
                                        theme={sideBarCollapsedItemTheme?.item}
                                        href={ROUTES.sale}
                                        icon={MdOutlineCurrencyExchange}
                                    >
                                        Export
                                    </Sidebar.Item>
                                </Sidebar.Collapse>{" "}
                                <Sidebar.Collapse
                                    theme={sideBarTheme?.collapse}
                                    href={isCollapse ? ROUTES.warranty : ""}
                                    open={
                                        [
                                            ROUTES.warranty_invoice,
                                            ROUTES.warranty,
                                        ].includes(routeName) && !isCollapse
                                    }
                                    icon={RiToolsLine}
                                    label="Warranty"
                                >
                                    <Sidebar.Item
                                        active={
                                            routeName ===
                                            ROUTES.warranty_invoice
                                        }
                                        theme={sideBarCollapsedItemTheme?.item}
                                        href={ROUTES.warranty_invoice}
                                        icon={LiaFileInvoiceDollarSolid}
                                    >
                                        Invoices
                                    </Sidebar.Item>
                                    <Sidebar.Item
                                        active={routeName === ROUTES.warranty}
                                        theme={sideBarCollapsedItemTheme?.item}
                                        href={ROUTES.warranty}
                                        icon={RiToolsLine}
                                    >
                                        Warranty
                                    </Sidebar.Item>
                                </Sidebar.Collapse>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                        <div className="absolute w-full left-0 bottom-5 bg-transparent">
                            {isCollapse ? (
                                <Avatar
                                    className="p-2 flex rounded-lg hover:bg-background-hover cursor-pointer "
                                    rounded
                                    onClick={() => setIsCollapse(false)}
                                    placeholderInitials={staffInfo.name
                                        .split(" ")
                                        .slice(-2)
                                        .map((word) => word[0])
                                        .join("")}
                                ></Avatar>
                            ) : (
                                <div className="mx-4 ">
                                    <Dropdown
                                        theme={dropdownTheme}
                                        label={
                                            <Avatar
                                                className="p-2 flex rounded-lg hover:bg-background-hover cursor-pointer "
                                                rounded
                                                placeholderInitials={staffInfo.name
                                                    .split(" ")
                                                    .slice(-2)
                                                    .map((word) => word[0])
                                                    .join("")}
                                            >
                                                <div>
                                                    <p className=" font-semibold text-start text-secondary-950 text-sm">
                                                        {staffInfo.name}
                                                    </p>
                                                    <p className=" font-normal text-start text-secondary-600 text-sm">
                                                        {staffInfo.email}
                                                    </p>
                                                </div>
                                            </Avatar>
                                        }
                                        arrowIcon={false}
                                        inline
                                    >
                                        <Dropdown.Header
                                            theme={dropdownTheme?.floating}
                                        >
                                            <p className=" font-semibold text-start text-secondary-950 text-sm">
                                                {staffInfo.name}
                                            </p>
                                            <p className=" font-normal text-start text-secondary-600 text-sm">
                                                {staffInfo.email}
                                            </p>
                                        </Dropdown.Header>
                                        <Dropdown.Item
                                            theme={
                                                dropdownTheme?.floating?.item
                                            }
                                            href="/home"
                                        >
                                            Dashboard
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/setting">
                                            Settings
                                        </Dropdown.Item>
                                        <Dropdown.Divider
                                            theme={dropdownTheme?.floating}
                                        />
                                        <Dropdown.Item
                                            onClick={() => {
                                                localStorage.setItem(
                                                    "token",
                                                    "",
                                                );
                                                deleteCookie(
                                                    COOKIE_NAME.ACCESS_TOKEN,
                                                );
                                                router.push("/signin");
                                            }}
                                        >
                                            Sign out
                                        </Dropdown.Item>
                                    </Dropdown>
                                </div>
                            )}
                        </div>
                    </Sidebar>
                </Transition.Child>
            </Transition>
            {!isMobile ? (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsCollapse((prev) => !prev);
                        }}
                        className={` z-20 absolute rounded-full border-secondary-300 border-2 p-1 top-16 right-0 translate-x-1/2 bg-background-normal hover:bg-background-hover active:bg-background-active`}
                    >
                        <HiChevronLeft
                            className={` z-10 text-secondary-300 w-5 h-5 ${
                                isCollapse ? " rotate-180" : ""
                            }`}
                        />
                    </button>
                </>
            ) : null}
        </div>
        // </div>
    );
}

const ROUTES = {
    home: "/home",
    product: "/product",
    supplier: "/supplier",
    category: "/category",
    staff: "/staff",
    import_bill: "/import_bill",
    import: "/import",
    sale_invoice: "/sale-invoice",
    sale: "/sale",
    warranty_invoice: "/warranty-invoice",
    warranty: "/warranty",
    customer: "/customer",
};

const sideBarTheme: CustomFlowbiteTheme["sidebar"] = {
    root: {
        base: "h-full bg-background-sidebar border-r-[1px] border-secondary-200",
        collapsed: {
            on: "w-16",
            off: "w-64",
        },
        inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-background-sidebar py-4 px-3",
    },
    collapse: {
        button: "group flex w-full items-center rounded-lg p-2 text-sm font-normal text-secondary-900 transition duration-75 hover:bg-primary-100",
        icon: {
            base: "h-6 w-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900",
            open: {
                off: "text-secondary-600",
                on: "text-secondary-900",
            },
        },
        label: {
            base: "ml-3 flex-1 whitespace-nowrap text-left",
            icon: {
                base: "h-6 w-6 text-secondary-500 transition ease-in-out delay-0",
                open: {
                    on: "rotate-180",
                    off: "",
                },
            },
        },
        list: "space-y-2 py-2",
    },
    cta: {
        base: "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
        color: {
            blue: "bg-cyan-50 dark:bg-cyan-900",
            dark: "bg-dark-50 dark:bg-dark-900",
            failure: "bg-red-50 dark:bg-red-900",
            gray: "bg-alternative-50 dark:bg-alternative-900",
            green: "bg-green-50 dark:bg-green-900",
            light: "bg-light-50 dark:bg-light-900",
            red: "bg-red-50 dark:bg-red-900",
            purple: "bg-purple-50 dark:bg-purple-900",
            success: "bg-green-50 dark:bg-green-900",
            yellow: "bg-yellow-50 dark:bg-yellow-900",
            warning: "bg-yellow-50 dark:bg-yellow-900",
        },
    },
    item: {
        base: "flex items-center justify-center rounded-lg p-2 text-sm font-normal text-secondary-600 transition-all duration-200 hover:bg-primary-100 active:bg-primary-300 hover:text-secondary-950 hover:font-semibold ",
        active: " text-secondary-950 font-semibold bg-primary-200",
        collapsed: {
            insideCollapse: "group w-full pl-8 transition duration-200",
            noIcon: "font-bold",
        },
        content: {
            base: "px-3 flex-1 whitespace-nowrap",
        },
        icon: {
            base: "h-6 w-6 flex-shrink-0 text-secondary-600 transition duration-75 group-hover:text-secondary-950",
            active: "text-secondary-950",
        },
        label: "",
        listItem: "",
    },
    //@ts-ignore
    items: "",
    //@ts-ignore
    itemGroup:
        "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
    logo: {
        base: "mb-5 flex items-center pl-2.5",
        collapsed: {
            on: "hidden",
            off: "self-center whitespace-nowrap text-xl font-semibold dark:text-white",
        },
        img: "mr-3 h-6 sm:h-7",
    },
};

const sideBarCollapsedItemTheme: CustomFlowbiteTheme["sidebar"] = {
    item: {
        base: "flex items-center justify-center rounded-lg p-2 text-sm font-normal text-secondary-600 transition-all duration-200 hover:bg-primary-100 active:bg-primary-300 ",
        active: " text-primary-500 underline underline-offset-4 font-medium",
        collapsed: {
            insideCollapse: "group w-full pl-8 transition duration-200",
            noIcon: "font-bold",
        },
        content: {
            base: "px-3 flex-1 whitespace-nowrap",
        },
        icon: {
            base: "h-6 w-6 flex-shrink-0 text-secondary-600 transition duration-75 group-hover:text-secondary-950",
            active: "text-secondary-950",
        },
        label: "",
        listItem: "",
    },
};

const dropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "ml-2 h-4 w-4 text-secondary-950",
    content:
        "py-1 text-secondary-900 bg-background-secondary focus:outline-none",
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
        base: "z-10 w-fit rounded bg-background-secondary divide-y divide-secondary-100 shadow focus:outline-none",
        content: "py-1 text-sm text-secondary-700",
        divider: "my-1 h-px bg-secondary-100",
        header: "block py-2 px-4 text-sm text-secondary-700",
        hidden: "invisible opacity-0",
        item: {
            // container: "",
            base: "flex flex-row items-center justify-between py-2 px-4 text-sm text-secondary-800 cursor-pointer w-full bg-background-secondary hover:bg-secondary-100 focus:bg-secondary-100 ",
            icon: "mr-2 justify-self-end h-5 w-5",
        },
        style: {
            light: "border border-secondary-200 bg-background-secondary text-secondary-900",
            auto: "border border-secondary-200 bg-background-secondary text-secondary-900",
        },
        target: " max-w-[250px] w-max border-2 border-surface-grey02 text-ellipsis flex bg-surface-grey01 text-secondary-950 transition duration-200 enabled:hover:bg-primary-200 enabled:active:bg-primary-300",
    },
    inlineWrapper: "flex w-full items-center justify-between",
};

type PropTypes = {
    isCollapse: boolean;
    staffInfo: Staff;
};
