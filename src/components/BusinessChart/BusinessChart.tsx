"use client";

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { viewWeekCost } from "@/api/statistic/cost.api";
import { viewWeekRevenue } from "@/api/statistic/revenue.api";
import { Be_Vietnam_Pro } from "next/font/google";
import FONT from "@/utils/fontFamily";

ChartJS.register(
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
    scales: {
        x: {
            ticks: {
                font: {
                    // family: "Be Vietnam Pro",
                    size: 14 as const,
                    weight: "bold" as const,
                    color: "#999fa8" as const,
                } as const,
                color: "#999fa8" as const,
                padding: 10,
            },
        },
        y: {},
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
            return `${dayIndex} ${monthName}`;
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
                fill: true,
            },
            {
                label: "Revenue",
                data: revenues || labels.map(() => 0),
                borderColor: "#3CAEF4",
                backgroundColor: "#E1F0FD",
                tension: 0.35,
            },
        ],
    };

    return (
        <>
            <div className=" w-full flex justify-between">
                <p className={` font-semibold text-lg ${font.className}`}>
                    Business state
                </p>
                <div></div>
            </div>
            {
                //@ts-ignore
                <Line options={options} data={data} />
            }
        </>
    );
}
