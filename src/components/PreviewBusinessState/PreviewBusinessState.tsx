import { viewCurrentCost } from "@/api/statistic/cost.api";
import { viewCurrentRevenue } from "@/api/statistic/revenue.api";
import useScreen from "@/hooks/useScreen";
import { FaArrowUp } from "react-icons/fa6";
import { useQuery } from "react-query";

export default function PreviewBusinessState() {
    const { data: cost } = useQuery(["current-cost"], viewCurrentCost);
    const { data: revenue } = useQuery(["current-revenue"], viewCurrentRevenue);

    const screen = useScreen();

    return (
        <div className=" flex-initial rounded-xl bg-background-normal w-full h-fit sm:w-fit md:h-full sm:h-full md:w-fit p-6 flex flex-col min-[425px]:flex-row sm:flex-col gap-6 justify-evenly">
            <BusinessStateItem primary={revenue?.revenue} type="revenue" />
            <BusinessStateItem primary={cost?.cost} type="cost" />
        </div>
    );
}

function BusinessStateItem({
    primary,
    secondary,
    type,
}: {
    primary?: number;
    secondary?: number;
    type: "revenue" | "cost";
}) {
    const screen = useScreen();

    return screen("sm") ? (
        <div className=" relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="146"
                height="141"
                viewBox="0 0 146 141"
                fill="none"
            >
                <mask
                    id="path-1-inside-1_285_2186"
                    className=" fill-background-hover"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M81.5153 0C89.5704 0 95 9.44493 95 17.5V20.5C95 39.0015 109.998 54 128.5 54H134C140.627 54 146 59.3726 146 66V111C146 127.569 132.569 141 116 141H30C13.4315 141 0 127.569 0 111V30C0 13.4315 13.4315 0 30 0H81.5153Z"
                    />
                </mask>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M81.5153 0C89.5704 0 95 9.44493 95 17.5V20.5C95 39.0015 109.998 54 128.5 54H134C140.627 54 146 59.3726 146 66V111C146 127.569 132.569 141 116 141H30C13.4315 141 0 127.569 0 111V30C0 13.4315 13.4315 0 30 0H81.5153Z"
                    // className=" fill-background-hover"
                />
                <path
                    d="M96 20.5V17.5H94V20.5H96ZM128.5 53C110.551 53 96 38.4493 96 20.5H94C94 39.5538 109.446 55 128.5 55V53ZM134 53H128.5V55H134V53ZM145 66V111H147V66H145ZM145 111C145 127.016 132.016 140 116 140V142C133.121 142 147 128.121 147 111H145ZM116 140H30V142H116V140ZM30 140C13.9837 140 1 127.016 1 111H-1C-1 128.121 12.8792 142 30 142V140ZM1 111V30H-1V111H1ZM1 30C1 13.9837 13.9837 1 30 1V-1C12.8792 -1 -1 12.8792 -1 30H1ZM30 1H81.5153V-1H30V1ZM134 55C140.075 55 145 59.9249 145 66H147C147 58.8203 141.18 53 134 53V55ZM96 17.5C96 13.2686 94.5802 8.69264 92.0968 5.15481C89.6124 1.61561 85.9702 -1 81.5153 -1V1C85.1155 1 88.2156 3.10686 90.4598 6.30389C92.705 9.50229 94 13.6763 94 17.5H96Z"
                    fill="#D7DBE0"
                    mask="url(#path-1-inside-1_285_2186)"
                />
            </svg>
            <p
                className={` absolute top-5 left-4 text-2xl font-semibold ${
                    type === "revenue" ? " text-revenue" : " text-cost"
                }`}
            >
                {primary ? (
                    <>
                        {(primary / 1_000_000).toFixed(1)}
                        <br />
                        million
                    </>
                ) : (
                    "None"
                )}
            </p>
            <p
                className={` absolute flex gap-1 items-center px-2 py-[10px] left-[105px] top-[6px] rounded-full bg-green-200 font-medium text-sm`}
            >
                {secondary ? (
                    <>
                        {`${secondary}%`}
                        <FaArrowUp />
                    </>
                ) : (
                    "None"
                )}
            </p>
            <p className=" absolute bottom-4 left-4 font-semibold text-secondary-400">
                {type === "revenue" ? "Revenue" : "Expense"}
            </p>
        </div>
    ) : (
        <div className="">
            <p className=" bottom-4 font-medium text-secondary-400">
                {type === "revenue" ? "Revenue" : "Expense"}
            </p>
            <p
                className={` mt-1 text-2xl font-semibold ${
                    type === "revenue" ? " text-revenue" : " text-cost"
                }`}
            >
                {primary ? <>{(primary / 1_000_000).toFixed(1)} m</> : "None"}
            </p>
        </div>
    );
}
