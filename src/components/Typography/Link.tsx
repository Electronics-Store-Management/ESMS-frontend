import { ReactNodeChildren } from "@/types/ReactNodeChildren";

export default function Link({
	href = "",
	onClick = () => {},
	children,
	className,
	...props
}: PropTypes) {
	return (
		<a
			className={`font-medium text-sm text-primary-400 ${className}`}
			href={href}
			onClick={onClick}
			{...props}
		>
			{children}
		</a>
	);
}

type PropTypes = {
	href?: string;
	onClick?: (d: any) => any;
} & React.ComponentProps<"a"> &
	ReactNodeChildren;
