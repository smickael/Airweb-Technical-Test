import { useTranslation } from "react-i18next";
import { Product } from "../@types";
import { useCartContext } from "../context";
import { centsToEuros } from "../core";

export const Card = ({
	id,
	label,
	thumbnail_url,
	description,
	price,
}: Product) => {
	const cartContext = useCartContext();
	const { t } = useTranslation("commons");

	const addToCart = (id: string) => {
		cartContext.addToCart({ id });
	};

	const quantity = cartContext.cart[id]?.quantity;

	return (
		<div
			key={id}
			className="relative flex md:flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-slate-600"
		>
			<div className="bg-gray-200 w-1/4 md:w-auto md:h-96">
				<img
					className="flex flex-shrink-0 h-full w-full object-cover object-center md:h-full md:w-full"
					alt={label}
					src={thumbnail_url ? thumbnail_url : "/no_image.svg"}
				/>
			</div>
			<div className="w-3/4 md:w-full flex flex-col p-4 h-auto justify-between">
				<div className="flex flex-1 flex-col space-y-2">
					<h3 className="text-sm font-medium text-gray-900 dark:text-slate-50">
						{label}
					</h3>
					<p className="text-sm text-gray-500 dark:text-slate-400">
						{description}
					</p>
				</div>
				<div className="w-full flex flex-wrap justify-between items-center mt-3">
					<p className="text-base font-medium text-gray-900 dark:text-slate-50">
						{centsToEuros(price)}
					</p>
					<div
						className="group flex gap-x-2 px-2 py-1 rounded-full bg-slate-800 dark:bg-slate-600 cursor-pointer hover:bg-slate-700 items-center"
						onClick={() => addToCart(id)}
					>
						<img src="/addtoCart.svg" className="w-6 h-6" />{" "}
						<p className="group-hover:flex hidden text-slate-200 text-sm">
							{t("addToCart")}
						</p>
						{quantity && (
							<span className="text-slate-200 text-sm">({quantity})</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
