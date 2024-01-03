"use client";

import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import Customer from "@/types/entity/Customer";
import React, { useState } from "react";

export const CustomerContext = React.createContext<CustomerContext>({});

export default function CustomerProvider({ children }: ReactNodeChildren) {
    const [customer, setCustomer] = useState<Customer>();

    return (
        <CustomerContext.Provider value={{ customer, setCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
}

export type CustomerContext = {
    customer?: Customer;
    setCustomer?: React.Dispatch<React.SetStateAction<Customer | undefined>>;
};
