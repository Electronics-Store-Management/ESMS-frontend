"use client";

import { FileInput, Label } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { useDeepCompareEffect } from "react-use";

export default function DropZone({
    file: _file,
    defaultValue,
    onFileChange = () => {},
    className,
}: PropTypes) {
    const [file, setFile] = useState<File | null>();

    useDeepCompareEffect(() => {
        setFile(_file);
    }, [_file]);

    return (
        <div
            className={`flex flex-col w-full h-fit items-center justify-center ${className}`}
        >
            <Label
                htmlFor="dropzone-file"
                className={` flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
                    file || defaultValue ? "h-fit" : "h-64"
                }`}
            >
                {file || defaultValue ? (
                    file ? (
                        <Image
                            src={URL.createObjectURL(file)}
                            width={500}
                            height={256}
                            alt="Uploaded image"
                        />
                    ) : (
                        <Image
                            src={defaultValue || ""}
                            width={500}
                            height={256}
                            alt="Uploaded image"
                        />
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                            className="mb-4 h-8 w-8 text-secondary-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-secondary-500 ">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className="text-xs text-secondary-500 ">
                            PNG, JPG (MAX. 10000x10000px)
                        </p>
                    </div>
                )}
                <FileInput
                    id="dropzone-file"
                    className="hidden"
                    onChange={(e) => {
                        onFileChange(e.target.files?.item(0));
                        setFile(e.target.files?.item(0));
                    }}
                />
            </Label>
            {file && (
                <p className="mt-2 font-semibold text-secondary-900">
                    {file.name}
                </p>
            )}
            {file && (
                <p className="mt-2 italic text-secondary-500">
                    Click image to upload another one
                </p>
            )}
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    file?: File | null;
    onFileChange?: (file?: File | null) => any;
    defaultValue?: string;
};
