"use client";

import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import Supplier from "@/types/entity/Supplier";
import React, { useState } from "react";

export const SupplierContext = React.createContext<ISupplierContext>({});

export default function SupplierProvider({ children }: ReactNodeChildren) {
    const [supplier, setSupplier] = useState<Supplier>();

    return (
        <SupplierContext.Provider value={{ supplier, setSupplier }}>
            {children}
        </SupplierContext.Provider>
    );
}

export type ISupplierContext = {
    supplier?: Supplier;
    setSupplier?: React.Dispatch<React.SetStateAction<Supplier | undefined>>;
};
