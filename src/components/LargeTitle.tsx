interface LargeTitleProps {
	label: string;
}

export const LargeTitle = ({ label }: LargeTitleProps) => {
	return (
		<div className="w-full">
			<h1 className="text-3xl md:text-6xl text-slate-800 dark:text-white font-semibold pt-16 pb-8 md:pt-20 md:pb-10">
				{label}
			</h1>
		</div>
	);
};
