"use client";

import viewStaffProfile from "@/api/staff/getProfile";
import BusinessChart from "@/components/BusinessChart/BusinessChart";
import CategoryPieChart from "@/components/PieChart/PieChart";
import PreviewBusinessState from "@/components/PreviewBusinessState/PreviewBusinessState";
import useClient from "@/hooks/useClient";
import useScreen from "@/hooks/useScreen";

import { useQuery } from "react-query";

export default function Home() {
    const { data: staff } = useQuery(["profile"], viewStaffProfile);

    const isClient = useClient();
    const screen = useScreen();

    return (
        <div className=" h-full overflow-auto -my-8 -ml-10 -mr-8 py-8 pl-10 pr-8 flex flex-col gap-10 bg-secondary-25">
            <div className=" flex justify-between">
                <h1 className=" font-semibold text-2xl">
                    {`Hi ${staff?.name.split(" ").at(-1)},`}
                </h1>
                <div className=" shadow-md"></div>
            </div>
            {isClient &&
                (screen("xl") ? (
                    <div className=" flex flex-row gap-5 h-fit">
                        <PreviewBusinessState />
                        <div className=" flex-1 max-w-[1000px] relative bg-background-normal rounded-xl shadow-md ">
                            <BusinessChart title={"Business chart"} />
                        </div>
                        <div className=" flex-1 max-w-[350px] relative p-5 pb-10 bg-background-normal rounded-xl shadow-md ">
                            <CategoryPieChart title="Category" />
                        </div>
                    </div>
                ) : screen("md") ? (
                    <div className=" flex flex-col gap-5 w-full">
                        <div className=" flex flex-row gap-5">
                            <div className=" flex-1 max-w-[350px] relative p-5 pb-10 bg-background-normal rounded-xl shadow-md ">
                                <CategoryPieChart title="Category" />
                            </div>
                            <PreviewBusinessState />
                        </div>
                        <BusinessChart title={"Business chart"} />
                    </div>
                ) : (
                    <div className=" flex flex-col gap-5 w-full">
                        <PreviewBusinessState />
                        <BusinessChart title={"Business chart"} />
                        <CategoryPieChart title="Category" />
                    </div>
                ))}
        </div>
    );
}
