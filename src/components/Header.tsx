import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../context/themeContext";
import i18n from "../i18n";
import { Button } from "./Button";

export const Header = () => {
	const theme = useThemeContext();

	const languageList = ["en", "fr"];

	const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
		setCurrentLanguage(lng);
	};

	const { t } = useTranslation("commons");

	const handleDarkMode = () => {
		theme.toggleTheme();
	};
	return (
		<div
			className={`sticky top-0 z-20 bg-gray-0 bg-clip-padding w-full border-b-slate-300 dark:border-b-slate-400 border-b`}
		>
			<div className="px-4 py-2 flex justify-between items-center backdrop-filter backdrop-blur-lg bg-opacity-0 dark:bg-opacity-0 bg-white dark:bg-slate-800">
				<a href="/" className="flex gap-x-2 items-center">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png"
						alt="tailwind tickets"
						className="h-11"
					/>
					<h1 className="hidden sm:flex text-2xl font-bold tracking-tighter text-gray-800 dark:text-gray-200">
						{t("title")}
					</h1>
				</a>
				<div className="flex gap-x-6 items-center">
					<div className="flex flex-row">
						<select
							className="bg-white text-gray-900 border border-gray-400 hover:border-gray-500 rounded-md p-1 shadow"
							onChange={(e) => changeLanguage(e.target.value)}
							value={currentLanguage}
						>
							{languageList.map((lang) => (
								<option key={lang} value={lang} className="text-black">
									{lang}
								</option>
							))}
						</select>
					</div>
					<label className="toggleDarkBtn">
						<input
							type="checkbox"
							defaultChecked={theme.isDarkMode}
							onClick={handleDarkMode}
						/>
						<span className="slideBtnTg round"></span>
					</label>
					<a
						href="/"
						className="w-fit flex items-center gap-x-3 rounded-md hover:bg-slate-400 p-2"
					>
						<img
							src="/productGrid_light.svg"
							className="w-6 h-6 flex dark:hidden"
						/>
						<img
							src="/productGrid_dark.svg"
							className="w-6 h-6 hidden dark:flex"
						/>
						<p className="hidden md:flex font-semibold text-slate-800 dark:text-slate-50">
							{t("products")}
						</p>
					</a>
					<Button to="/cart" label={t("cart")} icon="/addtoCart.svg" />
				</div>
			</div>
		</div>
	);
};
