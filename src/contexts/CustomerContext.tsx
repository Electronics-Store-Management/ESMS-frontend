"use client";

import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { CustomerRequest } from "@/types/entity/Customer";
import React, { useState } from "react";

export const CustomerContext = React.createContext<CustomerContext>({});

export default function CustomerProvider({ children }: ReactNodeChildren) {
    const [customer, setCustomer] = useState<CustomerRequest>();

    return (
        <CustomerContext.Provider value={{ customer, setCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
}

export type CustomerContext = {
    customer?: CustomerRequest;
    setCustomer?: React.Dispatch<
        React.SetStateAction<CustomerRequest | undefined>
    >;
};
