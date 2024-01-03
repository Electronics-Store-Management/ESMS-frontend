import StaffAvatar from "@/components/StaffAvatar/StaffAvatar";
import API from "@/constants/apiEnpoint";
import Revision from "@/types/Revision";
import ImportBill, { ImportProductResponse } from "@/types/entity/ImportBill";
import fetchWithToken from "@/utils/fetchWithToken";

export default async function Page({ params: { id } }: PropTypes) {
    const importBillResponse = await fetchWithToken(
        API.importBill.getDetail(id),
    );

    const importBillHistory = await importBillResponse.json();
    const importBill: Revision<ImportBill<ImportProductResponse>> =
        importBillHistory?.[0];

    return <StaffAvatar username={importBill.username} />;
}

type PropTypes = {
    params: { id: string };
};
