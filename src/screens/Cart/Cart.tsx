import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, LargeTitle, Loading } from "../../components";
import { cartQuantityLimit } from "../../config";
import { useCartContext } from "../../context";
import { centsToEuros } from "../../core";
import { processOrder } from "./Cart.logic";

export function CartScreen() {
	const { cart, updateCart, removeFromCart } = useCartContext();
	const [payment, setPayment] = useState(false);
	const { t } = useTranslation("commons");

	const descriptions = Object.keys(cart).map((id) => {
		return {
			id: id,
			quantity: cart[id].quantity,
		};
	});

	const ordersQuery = useQuery({
		queryKey: ["orders", ...descriptions],
		queryFn: () => {
			return processOrder(descriptions);
		},
	});

	if (ordersQuery.isLoading) return <Loading />;

	if (ordersQuery.error || ordersQuery.data == null)
		return "An error has occurred: " + ordersQuery.error;

	const updateQuantity = (id: string, quantity: number) => {
		updateCart({ id, quantity });
	};

	function handleRemove(id: string) {
		removeFromCart(id);
	}

	function pay() {
		setPayment(!payment);
		sessionStorage.clear();
		setPayment(!payment);
	}

	const total = ordersQuery.data.reduce((previous, order) => {
		return previous + order.quantity * order.product.price;
	}, 0);

	const quantity = ordersQuery.data.reduce((previous, order) => {
		return previous + order.quantity;
	}, 0);

	return (
		<div className="w-full">
			<LargeTitle label={t("cart")} />
			{total === 0 && (
				<div className="relative overflow-hidden w-full rounded-lg p-10 flex flex-col gap-y-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400 via-cyan-600 to-pink-300">
					<h1 className="text-xl font-semibold tracking-tight">
						{t("emptyCart")}
					</h1>
					<Button label={t("enjoy")} to="/" />
					<img
						src="/tailwindtickets.svg"
						className="w-1/4 md:w-auto absolute right-4 -bottom-2 -rotate-45"
					/>
				</div>
			)}
			<div className="w-full md:flex gap-x-4">
				{!payment ? (
					<div className="md:w-2/3 w-full flex flex-col gap-y-3 mb-6 md:mb-0">
						{ordersQuery.data.map((order) => {
							return (
								<div
									className="gap-x-2 rounded-lg bg-white p-2 shadow-md flex sm:justify-start"
									key={order.product.id}
								>
									<img
										src={order.product.thumbnail_url || "/no_image.svg"}
										alt="product-image"
										className="rounded-lg w-20 h-20"
									/>
									<div className="sm:ml-4 flex w-full justify-between items-center">
										<div className="flex flex-col h-full justify-around">
											<h2 className="text-lg font-bold text-gray-900">
												{order.product.label}
											</h2>
											<div className="flex gap-x-6 items-center">
												<p className="font-semibold">
													{centsToEuros(order.product.price)}
												</p>
												<select
													onChange={(e) =>
														updateQuantity(
															order.product.id,
															Number(e.target.value)
														)
													}
													value={order.quantity}
													className="bg-white text-gray-900 border border-gray-400 hover:border-gray-500 rounded-md p-1 shadow"
												>
													{[...Array(cartQuantityLimit + 1).keys()].map(
														(index) => (
															<option value={index} key={index}>
																{index}
															</option>
														)
													)}
												</select>
											</div>
										</div>
										<div
											className="group h-fit p-2 mr-4 justify-center flex rounded-full bg-red-800 hover:bg-red-600 cursor-pointer items-center"
											onClick={() => handleRemove(order.product.id)}
										>
											<img src="/close.svg" className="w-3 h-3" />
										</div>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className="flex items-center justify-center w-full h-auto rounded-lg dark:bg-slate-50 mb-10">
						<p className="text-3xl font-bold text-slate-50 p-2 my-4 md:my-0 bg-green-500 rounded-2xl">
							{t("paid")}
						</p>
					</div>
				)}
				{total > 0 && (
					<div className="h-fit md:w-1/3 rounded-lg bg-white p-4 shadow-lg flex flex-col gap-y-4">
						<h1 className="text-xl font-bold">{t("summary")}</h1>
						<div>
							<div className="flex w-full justify-between">
								<h1>{t("totalItems")}</h1>
								<h1 className=" font-medium">{quantity}</h1>
							</div>
							<div className="flex w-full justify-between">
								<h1>{t("subTotal")}</h1>
								<h1 className=" font-medium">{centsToEuros(total)}</h1>
							</div>
							<div className="flex w-full justify-between">
								<h1>{t("shippingFees")}</h1>
								<h1 className=" font-medium">{t("free")}</h1>
							</div>
							<div className="flex w-full justify-between mt-2 p-2 bg-slate-300">
								<h1 className=" font-medium">{t("total")}</h1>
								<h1 className=" font-medium">{centsToEuros(total)}</h1>
							</div>
						</div>
						<Button
							label={t("pay")}
							onClick={() => pay()}
							to="/"
							className="w-full justify-center"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
