import { useTranslation } from "react-i18next";

export const Search = ({
	onChange,
}: {
	onChange: React.ChangeEventHandler;
}) => {
	const { t } = useTranslation("commons");

	return (
		<input
			type="text"
			onChange={onChange}
			placeholder={t("search") || ""}
			className="block w-full rounded-md dark:bg-slate-700 text-slate-800 dark:text-slate-300 border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm my-4 p-2"
		/>
	);
};
