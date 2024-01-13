import ImportBill, { ImportProductResponse } from "@/types/entity/ImportBill";
import apiInstance from "../apiInstance";
import Revision from "@/types/Revision";
import withQuery from "@/utils/withQuery";

export default async function viewImportList({
    queryKey,
}: {
    queryKey: any;
}): Promise<any> {
    const [_key, start, end] = queryKey;
    const response = await apiInstance.get(
        withQuery("/import/history", {
            start: start || new Date().getTime(),
            end: end || new Date().getTime(),
        }),
    );

    const importList = response.data as Revision<
        ImportBill<ImportProductResponse>
    >[];

    return importList;
}
