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
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: false,
            text: "",
        },
    },
};

export default function BusinessChart({}: {}) {
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
                label: "Cost",
                data: costs || labels.map(() => 0),
                borderColor: "#FFCB1B",
                backgroundColor: "#FFF6C5",
                tension: 0.5,
            },
            {
                label: "Revenue",
                data: revenues || labels.map(() => 0),
                borderColor: "#3CAEF4",
                backgroundColor: "#E1F0FD",
                tension: 0.5,
            },
        ],
    };

    return (
        <>
            <div className=" w-full flex justify-between">
                <p className=" font-medium">Quantity</p>
                <div></div>
            </div>
            <Line options={options} data={data} />
        </>
    );
}
