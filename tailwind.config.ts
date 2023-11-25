import type { Config } from "tailwindcss";

const generateColor = (name: string, colors: number[]) => {
	return colors.reduce(
		(obj, num) => ({ ...obj, [num]: `var(--${name}-${num})` }),
		{}
	);
};

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/flowbite-react/**/*.js",
	],
	theme: {
		extend: {
			colors: {
				primary: generateColor(
					"primary",
					[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
				),
				secondary: generateColor(
					"secondary",
					[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
				),
				error: generateColor(
					"error",
					[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
				),
				background: {
					normal: "var(--background)",
					hover: "var(--background-hover)",
					active: "var(--background-active)",
				},
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
export default config;
