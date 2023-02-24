import { useTranslation } from "react-i18next";

export const Footer = () => {
	const { t } = useTranslation("commons");

	return (
		<footer className="w-full bg-gray-900 rounded-tl-3xl rounded-tr-3xl">
			<div className="mx-auto max-w-7xl px-6 pb-8 pt-10 lg:px-8">
				<div className="flex items-start w-full justify-between">
					<a href="/" className="flex gap-x-2 items-center">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png"
							alt="tailwind tickets"
							className="h-8"
						/>
						<h1 className="text-xl text-slate-200 font-semibold tracking-tighter">
							{t("title")}
						</h1>
					</a>
					<div className="flex flex-col gap-y-4">
						<a href="/" className="text-sm font-semibold leading-6 text-white">
							{t("products")}
						</a>
						<a
							href="/cart"
							className="text-sm font-semibold leading-6 text-white"
						>
							{t("cart")}
						</a>
					</div>
				</div>

				<div className="mt-8 border-t border-white/10 pt-4 md:flex md:items-center md:justify-between">
					<div className="flex space-x-6 md:order-2"></div>
					<p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
						{t("title")} 2023 &copy; {t("rights")}
					</p>
				</div>
			</div>
		</footer>
	);
};
