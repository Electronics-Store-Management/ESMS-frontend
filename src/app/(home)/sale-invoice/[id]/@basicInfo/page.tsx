import LabeledText from "@/components/Typography/LabeledText";
import API from "@/constants/apiEnpoint";
import Revision from "@/types/Revision";
import SaleBill, { SaleProductResponse } from "@/types/entity/SaleBill";
import fetchWithToken from "@/utils/fetchWithToken";
import FORMATTER from "@/utils/formatter";

import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";

export default async function Page({ params: { id } }: PropTypes) {
    const saleBillResponse = await fetchWithToken(API.saleBill.getDetail(id));

    if (saleBillResponse.status != 200) {
        throw "error";
    }

    const saleBillHistory: Revision<SaleBill<SaleProductResponse>>[] =
        await saleBillResponse.json();

    const saleBill = saleBillHistory?.[0];
    const products = saleBill.revision.saleProducts;

    const totalPrice = products.reduce(
        (total: number, { quantity, price }: SaleProductResponse) =>
            total + quantity * price,
        0,
    );

    return (
        <div className=" flex flex-col gap-4">
            <div className=" flex gap-2 items-end">
                <LabeledText
                    title="Sale date"
                    value={FORMATTER.toShortDate(saleBill.timestamp)}
                    icon={<IoCalendarNumberOutline size={20} />}
                />
            </div>
            <LabeledText
                title="Payment method"
                value={saleBill.revision.paymentMethod}
                icon={<MdOutlinePayment size={20} />}
            />
            <LabeledText title="Note" value={saleBill.revision.note} />
            <hr />
            <div className=" mt-2">
                <p className=" font-semibold mb-2">Product list</p>
                {products.map(({ product, quantity, price }) => (
                    <div
                        key={product.id}
                        className=" py-2 -mx-3 px-3 rounded-lg flex justify-between items-center duration-150 hover:bg-background-hover cursor-pointer"
                    >
                        <div>
                            <p className=" font-semibold">{product.name}</p>
                            <p className=" mt-1 text-sm text-secondary-600">
                                <span className=" font-medium text-secondary-800">
                                    {FORMATTER.toCurrency(price)}
                                </span>
                                <span>{" x "}</span>
                                <span className=" font-medium text-secondary-800">
                                    {quantity}
                                </span>
                                <span className="">{` ${product.unit}`}</span>
                            </p>
                        </div>
                        <p className=" text-base font-semibold">
                            {FORMATTER.toCurrency(quantity * price)}
                        </p>
                    </div>
                ))}
                <div className=" mt-4 py-2 -mx-3 px-3 rounded-lg flex justify-between items-center bg-secondary-50">
                    <p className=" font-semibold">Total</p>
                    <p className=" text-base font-semibold">
                        {FORMATTER.toCurrency(totalPrice)}
                    </p>
                </div>
            </div>
        </div>
    );
}

type PropTypes = {
    params: { id: string };
};
