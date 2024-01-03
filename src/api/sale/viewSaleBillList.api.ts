import Revision from "@/types/Revision";
import SaleBill, { SaleProductResponse } from "@/types/entity/SaleBill";
import withQuery from "@/utils/withQuery";
import apiInstance from "../apiInstance";

export default async function viewSaleBillList({
    queryKey,
}: {
    queryKey: any;
}): Promise<any> {
    const [_key, start, end] = queryKey;
    const response = await apiInstance.get(
        withQuery("/sale/history", {
            start: start || new Date().getTime(),
            end: end || new Date().getTime(),
        }),
    );

    const saleBillList = response.data as Revision<
        SaleBill<SaleProductResponse>
    >[];

    return saleBillList;
}
