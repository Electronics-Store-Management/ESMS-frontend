"use client";

import { viewWeekCost } from "@/api/statistic/cost.api";
import { viewWeekRevenue } from "@/api/statistic/revenue.api";
import FONT from "@/utils/fontFamily";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    RadialLinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";

ChartJS.register(
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export const options = {
    responsive: true,
    interaction: {
        intersect: false,
    },
    plugins: {
        legend: {
            position: "top" as const,
            align: "end" as const,
            labels: {
                pointStyle: "circle" as const,
                boxWidth: 3,
                boxHeight: 3,
                usePointStyle: true,
                font: {
                    size: 14,
                    weight: "normal",
                    family: "'Be Vietnam Pro', sans-serif",
                },
            },
        },
        title: {
            display: false,
            text: "",
        },
    },
    scales: {
        x: {
            ticks: {
                font: {
                    family: "'Be Vietnam Pro', sans-serif",
                    size: 15 as const,
                    // weight: "bold" as const,
                    color: "#6B7280" as const,
                } as const,
                color: "#6B7280" as const,
                padding: 30,
            },
            gridLines: {
                color: "rgba(0, 0, 0, 0)",
            },
            grid: {
                display: false,
            },
            border: {
                backdropPadding: 50,
                backdropColor: "rgba(0, 0, 0, 0)",
            },
            major: {
                enabled: true,
            },
        },
        y: {
            ticks: {
                font: {
                    family: "'Be Vietnam Pro', sans-serif",
                    size: 14 as const,
                    // weight: "bold" as const,
                    color: "#6B7280" as const,
                } as const,
                color: "#6B7280" as const,
                padding: 30,
            },
            gridLines: {
                color: "rgba(0, 0, 0, 0)",
            },
            border: {
                width: 0,
            },
        },
    },
};

const font = FONT.primary;

export default function BusinessChart({ title }: { title: string }) {
    const { data: costs } = useQuery(["cost-week"], viewWeekCost);
    const { data: revenues } = useQuery(["revenue-week"], viewWeekRevenue);

    const now = new Date();

    const labels = Array(7)
        .fill("")
        .map((a, day) => {
            const date = new Date();
            date.setDate(now.getDate() - day);
            const dayIndex = date.getDate();
            const monthName = date.toLocaleString("default", {
                month: "short",
            });
            return `${dayIndex.toString().padStart(2, "0")} ${monthName}`;
        })
        .reverse();

    const data = {
        labels,
        datasets: [
            {
                label: "Expense",
                data: costs || labels.map(() => 0),
                borderColor: "#FFCB1B",
                backgroundColor: "#FFF6C5",
                tension: 0.35,
                borderWidth: 4,
                fill: true,
            },
            {
                label: "Revenue",
                data: revenues || labels.map(() => 0),
                borderColor: "#3CAEF4",
                backgroundColor: "#E1F0FD",
                borderWidth: 4,
                tension: 0.35,
            },
        ],
    };

    return (
        <div className=" flex-1 relative bg-background-normal rounded-xl shadow-md ">
            <div className=" w-full p-4 flex justify-between">
                <p className={` font-semibold text-lg ${font.className}`}>
                    Business state
                </p>
                <div></div>
            </div>
            {
                //@ts-ignore
                <Line options={options} data={data} />
            }
        </div>
    );
}
