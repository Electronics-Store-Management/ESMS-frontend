import FONT from "../../utils/fontFamily";
import React from "react";
import { useForm } from "react-hook-form";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import ControllerSelectInput from "../ControllerInput/ControllerSelectInput";

export default function CreateProductForm({ className, ...props }: PropTypes) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        setError,
        clearErrors,
    } = useForm<FormValues>();

    async function onSubmit() {}

    return (
        <div
            className={` w-[700px] bg-background-normal rounded-2xl p-8 border-secondary-200 border-2 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
            >
                Add product
            </h1>
            <form
                className=" grid grid-cols-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <ControllerTextInput
                        control={control}
                        name="name"
                        title="Name"
                        rules={{ required: "Name is required" }}
                        register={register}
                        placeholder="BOYALINK"
                        onValueChange={(d: any) => {
                            clearErrors("name");
                        }}
                        error={errors.name}
                    />
                    <ControllerSelectInput
                        control={control}
                        name="category"
                        title="Category"
                    />
                </div>
            </form>
        </div>
    );
}

type PropTypes = {} & React.ComponentPropsWithoutRef<"div">;

type FormValues = {
    name: string;
    category: string;
    price: number;
    stock: number;
    guaranteeDate: Date;
    photo: File;
};
