import CustomerProvider from "@/contexts/CustomerContext";

export default function Layout(props: {
    children: React.ReactNode;
    customer: React.ReactNode;
    bill: React.ReactNode;
}) {
    return (
        <div className="w-full h-full overflow-auto grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
            <CustomerProvider>
                {props.customer}
                {props.bill}
            </CustomerProvider>
        </div>
    );
}
