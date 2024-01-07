import Revision from "@/types/Revision";
import WarrantyBill, {
    WarrantyProductResponse,
} from "@/types/entity/WarrantyBill";
import withQuery from "@/utils/withQuery";
import apiInstance from "../apiInstance";

export default async function viewWarrantyBillList({
    queryKey,
}: {
    queryKey: any;
}): Promise<any> {
    const [_key, start, end] = queryKey;
    const response = await apiInstance.get(
        withQuery("/warranty/history", {
            start: start || new Date().getTime(),
            end: end || new Date().getTime(),
        }),
    );

    const warrantyBillList = response.data as Revision<
        WarrantyBill<WarrantyProductResponse>
    >[];

    return warrantyBillList;
}
