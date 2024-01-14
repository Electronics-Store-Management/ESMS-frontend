"use client";

import { FileInput, Label } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { useDeepCompareEffect } from "react-use";

export default function DropZone({
    file: _file,
    index,
    defaultValue,
    isCompact,
    onFileChange,
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
                htmlFor={`dropzone-file-${index || 0}`}
                className={` flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-secondary-300 bg-secondary-50 hover:bg-secondary-100 ${
                    isCompact ? "h-12 sm:h-20" : "h-40 sm:h-64"
                    // file || defaultValue ? "h-64" : "h-64"
                }`}
            >
                {file || defaultValue ? (
                    file ? (
                        <Image
                            src={URL.createObjectURL(file)}
                            className=" h-full object-contain"
                            width={500}
                            height={256}
                            alt="Uploaded image"
                        />
                    ) : (
                        <Image
                            src={defaultValue || ""}
                            className=" h-full object-contain"
                            width={500}
                            height={256}
                            alt="Uploaded image"
                        />
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        {isCompact ? (
                            <svg
                                className="h-8 w-8 text-secondary-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="30"
                                viewBox="0 0 28 30"
                                fill="none"
                            >
                                <path
                                    d="M14.4603 3.62302L14.4607 3.62348L19.124 8.57696C19.2477 8.71448 19.3205 8.90368 19.3189 9.10542C19.3172 9.30852 19.2403 9.49723 19.1132 9.63231C18.9869 9.76641 18.8227 9.83646 18.6578 9.83799C18.494 9.8395 18.3301 9.77346 18.2024 9.64384L15.5306 6.80577L14.6666 5.88794V7.1485V17.7888C14.6666 17.9943 14.5895 18.1858 14.4608 18.3224C14.3331 18.458 14.1667 18.5281 13.9999 18.5281C13.8332 18.5281 13.6667 18.458 13.539 18.3224C13.4104 18.1858 13.3333 17.9943 13.3333 17.7888V7.1485V5.88794L12.4692 6.80577L9.79403 9.64741L9.79379 9.64766C9.66607 9.78352 9.49944 9.85381 9.33253 9.85393C9.16563 9.85406 8.99894 9.78403 8.87107 9.64839C8.74223 9.51173 8.66491 9.32018 8.66477 9.11452C8.66463 8.90892 8.74165 8.71729 8.87026 8.58041C8.8703 8.58037 8.87034 8.58033 8.87038 8.58029L13.5368 3.62348L13.5372 3.62302C13.6007 3.55547 13.6744 3.5036 13.7533 3.46883C13.8321 3.43409 13.9154 3.41667 13.9988 3.41667C14.0821 3.41667 14.1654 3.43409 14.2442 3.46883C14.3231 3.5036 14.3968 3.55547 14.4603 3.62302ZM17.9999 17.7888V17.6692H23.3333C23.8094 17.6692 24.2726 17.8699 24.6191 18.2379C24.9665 18.6069 25.1666 19.1136 25.1666 19.6477V24.6048C25.1666 25.139 24.9665 25.6456 24.6191 26.0147C24.2726 26.3827 23.8094 26.5833 23.3333 26.5833H4.66659C4.19043 26.5833 3.72719 26.3827 3.38073 26.0147C3.03329 25.6456 2.83325 25.139 2.83325 24.6048V19.6477C2.83325 19.1136 3.03329 18.6069 3.38073 18.2379C3.72719 17.8699 4.19043 17.6692 4.66659 17.6692H9.99992V17.7888C9.99992 18.8981 10.4145 19.9675 11.161 20.7604C11.9085 21.5545 12.929 22.0066 13.9999 22.0066C15.0709 22.0066 16.0914 21.5545 16.8388 20.7604C17.5854 19.9675 17.9999 18.8981 17.9999 17.7888ZM19.1549 24.6993C19.5255 24.9623 19.9646 25.1048 20.4166 25.1048C21.0234 25.1048 21.5988 24.8485 22.0181 24.4031C22.4364 23.9587 22.6666 23.3621 22.6666 22.7459C22.6666 22.2858 22.5383 21.8339 22.2949 21.4469C22.0513 21.0597 21.702 20.7532 21.2876 20.5708C20.8728 20.3883 20.4144 20.34 19.9718 20.4335C19.5295 20.527 19.1276 20.7568 18.8151 21.0887C18.5029 21.4204 18.2934 21.8393 18.2088 22.2912C18.1241 22.743 18.1673 23.2116 18.334 23.6389C18.5006 24.0664 18.7848 24.4365 19.1549 24.6993Z"
                                    fill="#B3BBC6"
                                    stroke="#B3BBC6"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-8 w-8 text-secondary-500"
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
                        )}
                        {!isCompact ? (
                            <>
                                <p className="mt-4 mb-2 text-sm text-secondary-500 ">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-secondary-500 ">
                                    PNG, JPG (MAX. 10000x10000px)
                                </p>
                            </>
                        ) : null}
                    </div>
                )}
                <FileInput
                    id={`dropzone-file-${index || 0}`}
                    className="hidden"
                    onChange={(e) => {
                        onFileChange?.(e.target.files?.item(0));
                        setFile(e.target.files?.item(0));
                    }}
                />
            </Label>
            {file && !isCompact && (
                <p className="mt-2 font-semibold text-secondary-900">
                    {file.name}
                </p>
            )}
            {file && !isCompact && (
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
    isCompact?: boolean;
    index?: number;
};
