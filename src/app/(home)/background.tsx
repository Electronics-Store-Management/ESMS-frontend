"use client";

import { useTheme } from "next-themes";

import BACKGROUND_TET from "@/assets/background-tet.png";
import Image from "next/image";

export default function Background() {
    const { theme } = useTheme();

    if (theme == "holiday")
        return (
            <div className=" absolute z-0 bottom-0 right-0 w-full h-full object-cover">
                <Image
                    src={BACKGROUND_TET}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                />
            </div>
        );
    return null;
}
