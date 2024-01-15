import SupplierProvider from "../../../contexts/SupplierContext";

export default function Layout(props: {
    children: React.ReactNode;
    supplier: React.ReactNode;
    bill: React.ReactNode;
}) {
    return (
        <div className="w-full h-full overflow-auto grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
            <SupplierProvider>
                {props.supplier}
                {props.bill}
            </SupplierProvider>
        </div>
    );
}
