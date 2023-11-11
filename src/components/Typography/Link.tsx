import { ReactNodeChildren } from "@/types/ReactNodeChildren";

export default function Link({
	href = "",
	children,
	className,
	...props
}: PropTypes) {
	return (
		<a
			className={`font-medium text-sm text-primary-400 ${className}`}
			href={href}
			{...props}
		>
			{children}
		</a>
	);
}

type PropTypes = {
	href?: string;
} & React.ComponentProps<"a"> &
	ReactNodeChildren;
