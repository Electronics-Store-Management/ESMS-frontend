"use client";

import { viewWeekCategory } from "@/api/statistic/category";
import useScreen from "@/hooks/useScreen";
import FONT from "@/utils/fontFamily";
import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip,
    RadialLinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "react-query";

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

const font = FONT.primary;

export default function CategoryPieChart({ title }: { title: string }) {
    const screen = useScreen();

    const { data: categories } = useQuery(
        ["statistic-categories"],
        viewWeekCategory,
    );

    const options = {
        responsive: true,
        interaction: {
            intersect: false,
        },
        cutout: "75%",
        borderWidth: 0,
        plugins: {
            legend: {
                position: "bottom" as const,
                align: "center" as const,
                padding: 100,
                title: {
                    padding: 100,
                },
                labels: {
                    padding: 10,
                    pointStyle: "circle" as const,
                    boxWidth: 6,
                    boxHeight: 6,
                    usePointStyle: true,
                    font: {
                        size: 14,
                        weight: "normal",
                    },
                },
            },
            title: {
                display: false,
                text: "",
            },
        },
        scales: {},
    };

    const labels =
        categories
            ?.map((value) => {
                return value.name;
            })
            .reverse() || [];

    const data = {
        labels,
        datasets: [
            {
                label: "Revenue",
                data: categories
                    ?.slice(0, 4)
                    .map((value) => value.revenue || 0),
                borderColor: "#FFCB1B",
                backgroundColor: ["#3CAEF4", "#BBE1FC", "#42E68E", "#C7B8FF"],
                hoverOffset: 8,
                rAxisID: "r",
            },
        ],
    };

    return (
        <>
            <div className=" w-full flex justify-between">
                <p className={` font-semibold text-lg ${font.className}`}>
                    {title}
                </p>
                <div></div>
            </div>
            <div className=" relative mt-10 px-0 sm:px-8 my-5">
                <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[90%]">
                    <p className=" text-secondary-950 font-semibold text-3xl text-center">
                        {`${(
                            (categories?.reduce(
                                (total, value) => total + (value.revenue || 0),
                                0,
                            ) || 0) / 1_000_000
                        ).toFixed(1)}m`}
                    </p>
                    <p className=" text-secondary-600 text-center">
                        total revenue
                    </p>
                </div>
                <div className=" relative max-w-[250px] mx-auto">
                    {
                        //@ts-ignore
                        <Doughnut options={options} data={data} />
                    }
                </div>
            </div>
        </>
    );
}
