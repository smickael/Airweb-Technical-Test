import { useTranslation } from "react-i18next";

export const Loading = () => {
	const { t } = useTranslation("commons");

	return (
		<div className="flex items-center gap-x-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png"
				className="animate-spin h-6 w-6"
			/>
			<h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
				{t("loading")}
			</h1>
		</div>
	);
};
