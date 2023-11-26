"use client";

import CategoryFilter from "@/components/Filter/CategoryFilter";
import PriceRangeFilter from "@/components/Filter/PriceRangeFilter";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    // const res = useQuery<boolean[]>(["products", query], viewProductList, {});

    return (
        <div className="w-full">
            <div className=" w-full grid grid-cols-2">
                <ProductSearch className="" />
                <div className=" flex justify-end gap-5">
                    <CategoryFilter className="" />
					<PriceRangeFilter />
                </div>
            </div>
        </div>
    );
}