"use client";

import { IoWarningOutline } from "react-icons/io5";

export default function ErrorPage() {
    return (
        <div className=" w-full flex flex-col items-center gap-3 p-5">
            <IoWarningOutline size={40} />
            <p className=" font-semibold">Can not load supplier detail</p>
        </div>
    );
}
