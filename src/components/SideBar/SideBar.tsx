"use client";

import { CustomFlowbiteTheme, Sidebar } from "flowbite-react";
import Image from "next/image";
import { HiChartPie, HiShoppingBag } from "react-icons/hi";

import LOGO from "../../assets/logo.png";
import FONT from "../../utils/fontFamily";
import { usePathname } from "next/navigation";

export default function SideBar() {
	const pathname = usePathname();
	const routeName = pathname.split("/").at(1) || "";

	return (
		<Sidebar
			theme={sideBarTheme}
			aria-label="Sidebar with multi-level dropdown example"
		>
			<div className=" flex gap-2 pl-3 pt-2 mb-8">
				<Image src={LOGO} width={30} height={30} alt="logo" />
				<h1
					className={` text-2xl text-secondary-950 font-semibold ${FONT.inter.className}`}
				>
					ESMS
				</h1>
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
						open={[ROUTES.category, ROUTES.product].includes(routeName)}
						icon={HiShoppingBag}
						label="Product"
					>
						<Sidebar.Item
							active={routeName === ROUTES.product}
							theme={sideBarCollapsedItemTheme?.item}
							href={ROUTES.product}
						>
							Product List
						</Sidebar.Item>
						<Sidebar.Item
							active={routeName === ROUTES.category}
							theme={sideBarCollapsedItemTheme?.item}
							href={ROUTES.category}
						>
							Category
						</Sidebar.Item>
					</Sidebar.Collapse>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
}

const ROUTES = { home: "home", product: "product", category: "category" };

const sideBarTheme: CustomFlowbiteTheme["sidebar"] = {
	root: {
		base: "h-full border-r-[1px] border-secondary-200",
		collapsed: {
			on: "w-16",
			off: "w-64",
		},
		inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-background py-4 px-3",
	},
	collapse: {
		button:
			"group flex w-full items-center rounded-lg p-2 text-base font-normal text-secondary-900 transition duration-75 hover:bg-primary-100",
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
		base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-secondary-600 transition-all duration-200 hover:bg-primary-100 active:bg-primary-300 hover:text-secondary-950 hover:font-semibold ",
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
	items: "",
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
		base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-secondary-600 transition-all duration-200 hover:bg-primary-100 active:bg-primary-300 ",
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
