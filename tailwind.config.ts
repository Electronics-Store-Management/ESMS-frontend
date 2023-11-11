import type { Config } from "tailwindcss";

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
				"th-primary": {
					50: "var(--primary-50)",
					100: "var(--primary-100)",
					200: "var(--primary-200)",
				},
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
export default config;
