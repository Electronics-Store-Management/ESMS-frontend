import StaffAvatar from "@/components/StaffAvatar/StaffAvatar";
import API from "@/constants/apiEnpoint";
import Revision from "@/types/Revision";
import WarrantyBill, {
    WarrantyProductResponse,
} from "@/types/entity/WarrantyBill";
import fetchWithToken from "@/utils/fetchWithToken";

export default async function Page({ params: { id } }: PropTypes) {
    const warrantyBillResponse = await fetchWithToken(
        API.warrantyBill.getDetail(id),
    );

    if (warrantyBillResponse.status != 200) {
        throw "error";
    }

    const warrantyBillHistory: Revision<
        WarrantyBill<WarrantyProductResponse>
    >[] = await warrantyBillResponse.json();

    const warrantyBill = warrantyBillHistory?.[0];

    return <StaffAvatar username={warrantyBill.username} />;
}

type PropTypes = {
    params: { id: string };
};
