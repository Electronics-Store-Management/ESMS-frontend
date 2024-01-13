import React, { useRef } from "react";
import {
    Button as ButtonFlowbite,
    TextInput as TextInputFlowbite,
    CustomFlowbiteTheme,
} from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import Button from "../Button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import SEARCH_PARAMS from "@/constants/searchParams";
import withQuery from "@/utils/withQuery";
import ImportBill from "@/types/entity/ImportBill";

const ImportBillSearchUI = ({
    onSearch = () => {},
    onImportBillCodeSearchChange = () => {},
    isImportBillLoading,
    className,
    ...props
}: PropTypes) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const importCodeRef = useRef<HTMLInputElement>(null);

    return (
        <div {...props} className={className}>
            <ButtonFlowbite.Group className="w-full">
                <TextInputFlowbite
                    ref={importCodeRef}
                    theme={textInputTheme}
                    defaultValue={
                        searchParams.get(SEARCH_PARAMS.importCode) || ""
                    }
                    placeholder="Enter import code here..."
                    sizing="md"
                />
                <Button
                    size="md"
                    pill
                    isLoading={isImportBillLoading}
                    onClick={() => {
                        router.push(
                            withQuery("/import", {
                                [SEARCH_PARAMS.importCode]:
                                    importCodeRef.current?.value,
                            }),
                        );
                    }}
                >
                    <HiOutlineSearch className="h-4 w-4" />
                </Button>
            </ButtonFlowbite.Group>
        </div>
    );
};

type PropTypes = React.ComponentPropsWithRef<"div"> & {
    onImportBillCodeSearchChange?: (keyword: string) => any;
    onSearch?: () => any;
    isImportBillLoading?: boolean;
    className?: string;
};

const textInputTheme: CustomFlowbiteTheme["textInput"] = {
    base: "w-full",
    field: {
        input: {
            withAddon: {
                off: "rounded-none rounded-s-lg w-full",
            },
        },
    },
};

export default ImportBillSearchUI;
