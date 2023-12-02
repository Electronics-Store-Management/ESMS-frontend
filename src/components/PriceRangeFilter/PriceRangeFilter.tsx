import Filter from "../Filter/Filter";

export default function PriceRangeFilter({
    onItemChange = () => {},
    ...props
}: PropTypes) {
    return (
        <Filter
            title="Price range"
            onItemChange={(item: string) =>
                onItemChange(priceRange.get(item) || "")
            }
            items={Object.keys(Object.fromEntries(priceRange))}
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
