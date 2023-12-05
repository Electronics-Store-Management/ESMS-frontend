import CategorySearchUI from "./CategorySearchUI";

export default function CategorySearch(
    props: Omit<React.ComponentPropsWithoutRef<"div">, "onClick">,
) {
    return <CategorySearchUI {...props}></CategorySearchUI>;
}

