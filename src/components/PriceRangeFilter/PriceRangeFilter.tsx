import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Filter from "../Filter/Filter";
import SEARCH_PARAMS from "@/constants/searchParams";
import withQuery from "@/utils/withQuery";

export default function PriceRangeFilter({
    onItemChange = () => {},
    ...props
}: PropTypes) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    return (
        <Filter
            title="Price range"
            items={Object.keys(Object.fromEntries(priceRange))}
            choosen={searchParams.get(SEARCH_PARAMS.price) || ""}
            onItemChange={(item) =>
                router.push(
                    withQuery(
                        pathname,
                        { [SEARCH_PARAMS.price]: item },
                        searchParams,
                    ),
                )
            }
            {...props}
        />
    );
}

type PropTypes = {
    onItemChange?: (item: string) => any;
} & Omit<React.ComponentPropsWithoutRef<"div">, "onClick">;

const priceRange = new Map([
    ["Below 100.000", "type_1"],
    ["100.000 - 200.000", "type_2"],
    ["200.000 - 500.000", "type_3"],
    ["Above 500.000", "type_4"],
]);
