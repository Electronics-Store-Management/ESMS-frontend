import type { Config } from "tailwindcss";

const generateColor = (name: string, colors: number[] | string[]) => {
    return colors.reduce(
        (obj, num) => ({ ...obj, [num]: `var(--${name}-${num})` }),
        {},
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
                    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
                ),
                secondary: generateColor(
                    "secondary",
                    [
                        25, 50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900,
                        950,
                    ],
                ),
                red: generateColor(
                    "red",
                    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
                ),
                green: generateColor(
                    "green",
                    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
                ),
                yellow: generateColor(
                    "yellow",
                    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
                ),
                color: generateColor("color", [
                    "heading",
                    "body",
                    "notation",
                    "error",
                ]),
                surface: generateColor("surface", [
                    "white",
                    "grey01",
                    "grey02",
                    "blue",
                    "dark",
                    "disabled",
                ]),
                line: generateColor("line", ["grey01", "grey02", "blue"]),
                background: {
                    normal: "var(--background)",
                    secondary: "var(--background-secondary)",
                    sidebar: "var(--background-sidebar)",
                    hover: "var(--background-hover)",
                    active: "var(--background-active)",
                },
                revenue: "var(--revenue)",
                cost: "var(--cost)",
            },
            animation: {
                openSideBar: "openSideBar 0.2s linear forwards 1",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
export default config;
