import StaffAvatar from "@/components/StaffAvatar/StaffAvatar";
import API from "@/constants/apiEnpoint";
import Revision from "@/types/Revision";
import SaleBill, { SaleProductResponse } from "@/types/entity/SaleBill";
import fetchWithToken from "@/utils/fetchWithToken";

export default async function Page({ params: { id } }: PropTypes) {
    const saleBillResponse = await fetchWithToken(API.saleBill.getDetail(id));

    if (saleBillResponse.status != 200) {
        throw "error";
    }

    const saleBillHistory: Revision<SaleBill<SaleProductResponse>>[] =
        await saleBillResponse.json();

    const saleBill = saleBillHistory?.[0];

    return <StaffAvatar username={saleBill.username} />;
}

type PropTypes = {
    params: { id: string };
};
