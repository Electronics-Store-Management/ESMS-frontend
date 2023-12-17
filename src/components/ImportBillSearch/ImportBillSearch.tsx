import ImportBillSearchUI from "./ImportBillSearchUI";

export default function ImportBillSearch(
    props: Omit<React.ComponentPropsWithoutRef<"div">, "onClick">,
) {
    return <ImportBillSearchUI {...props}></ImportBillSearchUI>;
}

