import { useState } from "react";

export const Filter = ({
	title,
	description,
	onClick,
}: {
	title: string;
	description: string;
	onClick: React.MouseEventHandler;
}) => {
	const [isReadMore, setIsReadMore] = useState(true);
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};

	return (
		<div className={"relative flex items-start"}>
			<div className="flex h-5 items-center">
				<input
					name={title}
					type="checkbox"
					onClick={onClick}
					className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
			</div>
			<div className="ml-3 text-sm">
				<label className="font-medium text-gray-700 dark:text-slate-50">
					{title}
				</label>
				<p className="text-gray-500 dark:text-slate-400 hidden md:block">
					{isReadMore && description.length > 100
						? description.slice(0, 100)
						: description}
					<span
						className="text-slate-800 dark:text-slate-50"
						onClick={toggleReadMore}
					>
						{description.length < 100
							? ""
							: isReadMore
							? "... voir plus"
							: " voir moins"}
					</span>
				</p>
			</div>
		</div>
	);
};
