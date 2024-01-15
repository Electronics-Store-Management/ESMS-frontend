import BaseEntity from "@/types/entity/BaseEntity";
import Product from "@/types/entity/Product";
import Image from "next/image";
import { HiOutlineX } from "react-icons/hi";
import TextInput from "../Input/TextInput";
import ProductPreview from "@/types/entity/ProductPreview";

export default function BillProductList<T extends Object & BaseEntity>({
    data,
    className,
    onChange = () => {},
    onRemove,
}: PropTypes) {
    return data.size ? (
        <div
            className={`flex flex-col gap-2 overflow-y-auto overflow-x-hidden ${className} `}
        >
            {Array.from(data.entries()).map(([id, product], index) => (
                <div
                    key={product.name}
                    className=" relative flex bg-secondary-50 rounded-md overflow-hidden"
                >
                    {product.photoURL ? (
                        <Image
                            src={product.photoURL}
                            className=" h-full object-cover overflow-hidden"
                            width={150}
                            height={150}
                            alt="product image of name "
                        />
                    ) : null}
                    <div
                        className=" absolute top-0 right-1 w-10 h-10 flex-none grid place-items-center cursor-pointer rounded-lg hover:bg-red-50 active:bg-red-100 duration-200"
                        onClick={() => onRemove?.(id)}
                    >
                        <HiOutlineX className=" text-red-400" size={20} />
                    </div>
                    <div className=" flex flex-col gap-2 p-2">
                        <p className=" text-secondary-900 font-semibold">{`${product.name}`}</p>
                        <div className=" flex gap-3 ">
                            <TextInput
                                type={"number"}
                                sizing={"sm"}
                                className={` w-2/3 text-xs font-normal`}
                                value={product.price}
                                onChange={(e) =>
                                    onChange(id, {
                                        ...product,
                                        price: parseInt(e.target.value, 10),
                                    })
                                }
                            />
                            <TextInput
                                type={"number"}
                                sizing={"sm"}
                                className={` w-1/3 text-xs font-normal`}
                                value={product.quantity}
                                onChange={(e) =>
                                    onChange(id, {
                                        ...product,
                                        quantity: parseInt(e.target.value, 10),
                                    })
                                }
                            />
                        </div>
                        <p className=" font-medium text-xs">Total: {product.quantity * product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p
            className={` w-full italic font-medium text-secondary-700 ${className}`}
        >
            No item selected
        </p>
    );
}

// export type BillProduct = {
//     id: string;
//     name: string;
//     quantity: number;
//     price: number;
//     unit: string;
// };

type PropTypes = Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> & {
    data: Map<string, ProductPreview>;
    onChange?: (id: string, value: ProductPreview) => any;
    onRemove?: (id: string) => any;
};
