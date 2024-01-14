"use client";

import viewStaffProfile from "@/api/staff/getProfile";
import BusinessChart from "@/components/BusinessChart/BusinessChart";
import CategoryPieChart from "@/components/PieChart/PieChart";
import PreviewBusinessState from "@/components/PreviewBusinessState/PreviewBusinessState";
import MenuButton from "@/components/SideBar/MenuButton";
import useClient from "@/hooks/useClient";
import useScreen from "@/hooks/useScreen";

import { useQuery } from "react-query";

export default function Home() {
    const isClient = useClient();
    const screen = useScreen();

    const isMobile = !screen("md");

    return (
        <div className=" h-full flex-1 overflow-auto -m-5 p-5 lg:-my-8 lg:-ml-10 lg:-mr-8 lg:py-8 lg:pl-10 lg:pr-8 flex flex-col gap-10 bg-secondary-75">
            <div className=" flex justify-between">
                <h1 className=" font-semibold text-2xl">
                    {/* {`Hi ${staff?.name.split(" ").at(-1)},`} */}
                    Dashboard
                </h1>
                <div className=" "> {isMobile ? <MenuButton /> : null}</div>
            </div>
            {isClient &&
                (screen("xl") ? (
                    <div className=" flex flex-row gap-5 h-fit">
                        <PreviewBusinessState />
                        <div className=" flex-1 max-w-[1000px] relative bg-background-normal rounded-xl ">
                            <BusinessChart title={"Business chart"} />
                        </div>
                        <div className=" flex-1 max-w-[350px] relative p-5 pb-10 bg-background-normal rounded-xl ">
                            <CategoryPieChart title="Category" />
                        </div>
                    </div>
                ) : screen("sm") ? (
                    <div className=" flex flex-col gap-5 w-full">
                        <div className=" flex flex-row gap-5">
                            <div className=" flex-1 max-w-[350px] relative p-5 pb-10 bg-background-normal rounded-xl ">
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
                        <div className=" flex-1 relative p-5 pb-10 bg-background-normal rounded-xl ">
                            <CategoryPieChart title="Category" />
                        </div>
                    </div>
                ))}
        </div>
    );
}
