import clsx from "clsx";

interface ButtonProps {
	to?: string;
	onClick?: () => void;
	label: string;
	icon?: string;
	className?: string;
}

export const Button = ({
	to,
	onClick,
	label,
	icon,
	className,
}: ButtonProps) => {
	return (
		<a
			href={to}
			onClick={onClick}
			className={clsx(
				"w-fit flex items-center gap-x-3 py-2 bg-slate-800 dark:bg-indigo-900 hover:bg-slate-700 rounded-lg cursor-pointer",
				icon ? "px-2 md:px-4" : "px-10",
				className
			)}
		>
			{icon && <img src={icon} className="w-6 h-6" />}
			<span className={clsx(icon && "hidden md:flex", "text-slate-200")}>
				{label}
			</span>
		</a>
	);
};
