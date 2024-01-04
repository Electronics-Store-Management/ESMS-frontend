"use client";

import viewStaffProfile from "@/api/staff/getProfile";
import BusinessChart from "@/components/BusinessChart/BusinessChart";
import PreviewBusinessState from "@/components/PreviewBusinessState/PreviewBusinessState";
import useClient from "@/hooks/useClient";

import { useQuery } from "react-query";

export default function Home() {
    const { data: staff } = useQuery(["profile"], viewStaffProfile);

    const isClient = useClient();

    return (
        <div className=" h-full -my-8 -ml-10 -mr-8 py-8 pl-10 pr-8 flex flex-col gap-10 bg-secondary-25">
            <div className=" flex justify-between">
                <h1 className=" font-semibold text-2xl">
                    {`Hi ${staff?.name.split(" ").at(-1)},`}
                </h1>
                <div className=" shadow-md"></div>
            </div>
            <div className=" flex gap-5 h-fit">
                <div className=" flex-initial rounded-xl shadow-lg bg-background-normal">
                    <PreviewBusinessState />
                </div>
                <div className=" flex-1 max-w-[800px] relative p-5 pb-10 bg-background-normal rounded-xl shadow-lg ">
                    {isClient ? <BusinessChart /> : null}
                </div>
                <div></div>
            </div>
        </div>
    );
}
