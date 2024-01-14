import {
    Accordion,
    AccordionContent,
    AccordionPanel,
    AccordionTitle,
    CustomFlowbiteTheme,
    Dropdown,
    DropdownItem,
} from "flowbite-react";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { HiPlus, HiTrash } from "react-icons/hi";
import { NewProduct } from "../../api/product/addNewProduct.api";
import Category from "../../types/entity/Category";
import FONT from "../../utils/fontFamily";
import Button from "../Button/Button";
import ControllerSelectInput from "../ControllerInput/ControllerSelectInput";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import DropZone from "../DropZone/DropZone";
import { useCreateProductModal } from "./CreateProductFormModal";
import TextInput from "../Input/TextInput";

export default function CreateProductFormUI({
    categories = [],
    isCategoryLoading = false,
    onSubmitData,
    className,
    ...props
}: PropTypes) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue,
        clearErrors,
    } = useForm<NewProduct>({
        defaultValues: {
            photo: Array(5).fill(""),
            specifications: [],
        },
    });

    const { closeCreateProductModal } = useCreateProductModal();

    function onChangeSpec(
        index: number,
        name: string,
        value: string,
        type: string,
    ) {
        const spec = getValues("specifications");
        spec[index] = { name, value, type };
        return [...spec];
    }

    function onAddSpec() {
        const spec = getValues("specifications");
        spec.push({ name: "", value: "", type: "text" });
        setValue("specifications", [...spec]);
    }

    function onRemoveSpec(index: number) {
        const spec = getValues("specifications");
        setValue("specifications", [...spec.filter((_, id) => id !== index)]);
    }

    return (
        <div className=" w-full max-h-screen py-0">
            <div
                className={` w-full mb-0 bg-background-normal sm:rounded-2xl p-4 sm:p-8 ${className}`}
                {...props}
            >
                <h1
                    className={` mt-3 sm:mt-0 text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
                >
                    Add product
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmitData)}
                    className=" mt-5 sm:mt-0 overflow-auto"
                >
                    <div className=" flex flex-col lg:grid lg:grid-cols-2 gap-5 mt-5">
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
                                name="categoryId"
                                title="Category"
                                isLoading={isCategoryLoading}
                                items={categories}
                                choseValue={getValues("categoryId")}
                                onValueChange={(value) =>
                                    setValue("categoryId", value)
                                }
                            />
                            <div className=" flex gap-5">
                                <ControllerTextInput
                                    control={control}
                                    className=" w-full"
                                    name="price"
                                    title="Price"
                                    type="number"
                                    rules={{
                                        required: "Price is required",
                                        validate: (value: any) =>
                                            value <= 0
                                                ? "Price must be greater than 0"
                                                : undefined,
                                    }}
                                    register={register}
                                    onValueChange={(d: number) => {
                                        clearErrors("price");
                                    }}
                                    error={errors.price}
                                />
                                <ControllerTextInput
                                    control={control}
                                    className="min-w-36"
                                    name="unit"
                                    title="Unit"
                                    rules={{ required: "Unit is required" }}
                                    register={register}
                                    placeholder="Unit"
                                    onValueChange={(d: any) => {
                                        clearErrors("unit");
                                    }}
                                    error={errors.unit}
                                />
                            </div>
                            <div className=" flex items-end gap-2">
                                <ControllerTextInput
                                    control={control}
                                    className="w-36"
                                    name="warrantyPeriod"
                                    type="number"
                                    title="Warranty period"
                                    rules={{
                                        required: "Warranty period is required",
                                        validate: (value: any) =>
                                            value < 0
                                                ? "Warranty period must be greater than 0"
                                                : undefined,
                                    }}
                                    register={register}
                                    placeholder="Warranty period"
                                    onValueChange={(d: any) => {
                                        clearErrors("warrantyPeriod");
                                    }}
                                    error={errors.warrantyPeriod}
                                />
                                <p className=" font-medium mb-5"> months</p>
                            </div>
                        </div>
                        <div className=" pt-5 sm:pt-10">
                            <DropZone
                                index={0}
                                file={getValues("photo")?.[0]}
                                onFileChange={(file) => {
                                    if (!file) return;
                                    const photoList = getValues("photo");
                                    photoList[0] = file;
                                    setValue("photo", photoList);
                                }}
                            />
                            <div className="  mt-5 sm:mt-10 flex gap-5">
                                {Array(4)
                                    .fill("")
                                    .map((_, index) => (
                                        <DropZone
                                            index={index + 1}
                                            key={index}
                                            isCompact
                                            file={
                                                getValues("photo")?.[index + 1]
                                            }
                                            onFileChange={(file) => {
                                                if (!file) return;
                                                const photoList =
                                                    getValues("photo");
                                                console.log({ index });
                                                photoList[index + 1] = file;
                                                setValue("photo", photoList);
                                            }}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                    <Accordion
                        theme={customTheme}
                        collapseAll
                        className="mt-8 mr-0"
                    >
                        <AccordionPanel theme={customTheme}>
                            <AccordionTitle theme={customTheme?.title}>
                                <p className=" font-medium text-sm">
                                    Detail specification
                                </p>
                            </AccordionTitle>
                            <AccordionContent theme={customTheme?.content}>
                                <Controller
                                    control={control}
                                    name={"specifications"}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <>
                                            {value.map(
                                                (
                                                    { name, value, type },
                                                    index,
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className=" my-4 sm:my-2 w-full flex flex-col sm:flex-row gap-3"
                                                    >
                                                        <div className=" flex flex-row gap-3">
                                                            {" "}
                                                            <Dropdown
                                                                theme={
                                                                    dropdownTheme
                                                                }
                                                                label={type}
                                                                dismissOnClick={
                                                                    true
                                                                }
                                                                size={"sm"}
                                                                className=" w-48"
                                                            >
                                                                {[
                                                                    "text",
                                                                    "email",
                                                                    "date",
                                                                    "number",
                                                                    "color",
                                                                ]?.map(
                                                                    (type) => (
                                                                        <DropdownItem
                                                                            key={
                                                                                type
                                                                            }
                                                                            onClick={() => {
                                                                                onChange(
                                                                                    onChangeSpec(
                                                                                        index,
                                                                                        name,
                                                                                        value,
                                                                                        type,
                                                                                    ),
                                                                                );
                                                                            }}
                                                                        >
                                                                            {
                                                                                type
                                                                            }
                                                                        </DropdownItem>
                                                                    ),
                                                                )}
                                                            </Dropdown>
                                                            <TextInput
                                                                type="text"
                                                                className=" w-80 text-secondary-900"
                                                                placeholder="Name"
                                                                value={name}
                                                                onChange={(
                                                                    e: any,
                                                                ) => {
                                                                    onChange(
                                                                        onChangeSpec(
                                                                            index,
                                                                            e
                                                                                .target
                                                                                .value,
                                                                            value,
                                                                            type,
                                                                        ),
                                                                    );
                                                                }}
                                                                name="Name"
                                                            />
                                                        </div>

                                                        <div className=" flex-1 flex gap-3 flex-row">
                                                            <TextInput
                                                                type={type}
                                                                className=" w-full text-secondary-900"
                                                                placeholder="Enter value here..."
                                                                value={value}
                                                                onChange={(
                                                                    e: any,
                                                                ) => {
                                                                    onChange(
                                                                        onChangeSpec(
                                                                            index,
                                                                            name,
                                                                            e
                                                                                .target
                                                                                .value,
                                                                            type,
                                                                        ),
                                                                    );
                                                                }}
                                                                name="Value"
                                                            />
                                                            <Button
                                                                hiddenTitle="Remove"
                                                                btnType={
                                                                    "error"
                                                                }
                                                                onClick={() =>
                                                                    onRemoveSpec(
                                                                        index,
                                                                    )
                                                                }
                                                            >
                                                                <HiTrash
                                                                    size={18}
                                                                />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </>
                                    )}
                                />
                                <Button
                                    size={"sm"}
                                    onClick={onAddSpec}
                                    className=" mt-8"
                                >
                                    <HiPlus className=" w-4 h-4 mr-2" />
                                    Add specification
                                </Button>
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                    <div className=" flex justify-between mt-12">
                        <Button
                            btnType="secondary"
                            onClick={() => closeCreateProductModal()}
                        >
                            Back
                        </Button>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    categories?: Category[];
    isCategoryLoading?: boolean;
    onSubmitData: SubmitHandler<NewProduct>;
};

const customTheme: CustomFlowbiteTheme["accordion"] = {
    root: {
        base: "divide-y divide-gray-200 border-gray-200 ",
        flush: {
            off: "rounded-lg border",
            on: "border-b",
        },
    },
    content: {
        base: "py-4 px-4 last:rounded-b-lg dark:bg-gray-900 first:rounded-t-lg",
    },
    title: {
        arrow: {
            base: "h-5 w-5 shrink-0",
            open: {
                off: "",
                on: "rotate-180",
            },
        },
        base: "flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-3 px-3 text-left font-medium text-gray-500 dark:text-gray-400",
        flush: {
            off: "hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800",
            on: "bg-transparent dark:bg-transparent",
        },
        heading: "",
        open: {
            off: "",
            on: "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white",
        },
    },
};

const dropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "absolute right-2 ml-2 h-4 w-4 text-secondary-950",
    content: "py-1 text-secondary-900 focus:outline-none",
    floating: {
        animation: "transition-opacity",
        arrow: {
            base: "absolute z-10 h-2 w-2 rotate-45",
            style: {
                light: "bg-secondary-900",
                auto: "bg-secondary-900",
            },
            placement: "-4px",
        },
        base: "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
        content: "py-1 text-sm text-gray-700",
        divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
        header: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
        hidden: "invisible opacity-0",
        item: {
            container: "",
            base: "flex flex-row items-center justify-between py-2 px-4 text-sm text-secondary-800 cursor-pointer w-full hover:bg-secondary-100 focus:bg-secondary-100 ",
            icon: "mr-2 justify-self-end h-5 w-5",
        },
        style: {
            light: "border border-secondary-200 bg-white text-secondary-900",
            auto: "border border-secondary-200 bg-white text-secondary-900",
        },
        target: " relative w-48 flex justify-start border-2 border-surface-grey02 text-ellipsis flex bg-surface-grey01 text-secondary-950 transition duration-200 enabled:hover:bg-primary-200 enabled:active:bg-primary-300",
    },
    inlineWrapper: "flex w-48 items-center justify-between",
};
