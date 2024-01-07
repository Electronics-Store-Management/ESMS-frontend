import LabeledText from "@/components/Typography/LabeledText";
import API from "@/constants/apiEnpoint";
import Revision from "@/types/Revision";
import WarrantyBill, {
    WarrantyProductResponse,
} from "@/types/entity/WarrantyBill";
import fetchWithToken from "@/utils/fetchWithToken";
import FORMATTER from "@/utils/formatter";

import { IoCalendarNumberOutline } from "react-icons/io5";

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
    const products = warrantyBill.revision.warrantyProducts;

    const totalQuantity = products.reduce(
        (total: number, { quantity }: WarrantyProductResponse) =>
            total + 1 * quantity,
        0,
    );

    return (
        <div className=" flex flex-col gap-4">
            <div className=" flex gap-2 items-end">
                <LabeledText
                    title="Warranty date"
                    value={FORMATTER.toShortDate(warrantyBill.timestamp)}
                    icon={<IoCalendarNumberOutline size={20} />}
                />
            </div>
            <LabeledText title="Note" value={warrantyBill.revision.note} />
            <hr />
            <div className=" mt-2">
                <p className=" font-semibold mb-2">Product list</p>
                {products.map(
                    ({ product, quantity, warrantyContent, note, status }) => (
                        <div
                            key={product.id}
                            className=" py-2 -mx-3 px-3 rounded-lg flex justify-between items-center duration-150 hover:bg-background-hover cursor-pointer"
                        >
                            <div>
                                <p className=" font-semibold">{`${quantity} x ${product.name}`}</p>
                                <p className=" mt-1 text-sm text-secondary-600">
                                    <span className=" font-semibold">
                                        Reason:{" "}
                                    </span>
                                    {warrantyContent}
                                </p>
                                <p className=" mt-1 text-sm text-secondary-600">
                                    <span className=" font-semibold">
                                        Note:{" "}
                                    </span>
                                    {note}
                                </p>
                            </div>
                            <p className=" text-base font-semibold">{status}</p>
                        </div>
                    ),
                )}
                <div className=" mt-4 py-2 -mx-3 px-3 rounded-lg flex justify-between items-center bg-secondary-50">
                    <p className=" font-semibold">Total</p>
                    <p className=" text-base font-semibold">{`${totalQuantity} products`}</p>
                </div>
            </div>
        </div>
    );
}

type PropTypes = {
    params: { id: string };
};
