"use client";

import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import Customer from "@/types/entity/Customer";
import React, { useState } from "react";

export const CustomerCreatingContext =
    React.createContext<CustomerCreatingContext>({});

export default function CustomerProvider({ children }: ReactNodeChildren) {
    const [customer, setCustomer] = useState<Customer>();

    return (
        <CustomerCreatingContext.Provider value={{ customer, setCustomer }}>
            {children}
        </CustomerCreatingContext.Provider>
    );
}

export type CustomerCreatingContext = {
    customer?: Customer;
    setCustomer?: React.Dispatch<React.SetStateAction<Customer | undefined>>;
};
