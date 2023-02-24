import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { Category, Product } from "../../@types";
import { Card, Filter, LargeTitle, Loading, Search } from "../../components";

export function ProductsScreen() {
	const [activeFilter, setActiveFilter] = useState<number[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [filtersMenu, setFiltersMenu] = useState(false);
	const [sortPrice, setSortPrice] = useState("");

	const { t } = useTranslation("commons");

	const getCategories = useQuery({
		queryKey: ["getCategories"],
		queryFn: () =>
			axios
				.get("https://test-feed.airweb.workers.dev/categories")
				.then((res) => res.data as Category[]),
	});
	const { isLoading, error, data } = useQuery({
		queryKey: ["getProducts"],
		queryFn: () =>
			axios
				.get("https://test-feed.airweb.workers.dev/products")
				.then((res) => res.data as Product[]),
	});

	if (isLoading) return <Loading />;

	if (error) return "An error has occurred: " + error;

	const handleSelect = (cateogry_id: number) => {
		if (activeFilter.includes(cateogry_id)) {
			const filters = activeFilter;
			const index = filters.indexOf(cateogry_id);
			filters.splice(index, 1);
			return setActiveFilter([...filters]);
		} else {
			return setActiveFilter([...activeFilter, cateogry_id]);
		}
	};

	const priceOptions = [
		{ value: "", label: t("filterBy") },
		{ value: "asc", label: t("asc") },
		{ value: "desc", label: t("desc") },
	];

	const handleSortPrice = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortPrice(event.target.value);
	};

	let selectedProduct = data
		?.filter((product) => product.label.includes(inputValue))
		.filter((product) => {
			if (activeFilter.length == 0) return true;
			else return activeFilter.includes(Number.parseInt(product.category_id));
		})
		.sort((a, b) => {
			if (sortPrice == "asc") {
				if (a.price < b.price) return -1;
				else if (a.price > b.price) return 1;
				else return 0;
			} else if (sortPrice == "desc") {
				if (a.price > b.price) return -1;
				else if (a.price < b.price) return 1;
				else return 0;
			} else return 0;
		});

	return (
		<div className="mb-10">
			<LargeTitle label={t("products")} />
			<Search
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setInputValue(e.target.value);
				}}
			/>
			<div className="flex flex-col lg:flex-row w-full gap-x-5">
				<div className="w-full lg:w-1/4 mb-10 lg:mb-0">
					<div
						className="group cursor-pointer rounded-lg hover:bg-slate-200 flex w-full justify-between items-center px-2 py-1 mb-2"
						onClick={() => setFiltersMenu(!filtersMenu)}
					>
						<p className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-slate-200 dark:group-hover:text-gray-900">
							{t("filters")}
						</p>
						<img
							src="/arrow.svg"
							className={clsx(
								filtersMenu === true ? "rotate-180" : "rotate-0",
								"cursor-pointer rounded-full group-hover:bg-slate-300 p-1"
							)}
						/>
					</div>
					<div
						className={clsx(
							filtersMenu === true
								? "flex flex-col gap-y-3 py-4 border-y border-y-slate-300"
								: "hidden"
						)}
					>
						{getCategories?.data?.map((filter) => {
							return (
								<Filter
									key={filter.index}
									title={filter.label}
									description={filter.description}
									onClick={() => handleSelect(filter.index)}
								/>
							);
						})}
					</div>
					<div
						className={clsx(
							filtersMenu === true
								? "flex flex-col gap-y-3 py-4 border-y border-b-slate-300"
								: "hidden"
						)}
					>
						<div>
							<select
								id="location"
								name="location"
								className="mt-1 block w-full rounded-md border border-gray-400 dark:bg-slate-700 dark:text-slate-50 py-2 pl-3 pr-10 text-base sm:text-sm"
								onChange={handleSortPrice}
								value={sortPrice}
							>
								{priceOptions.map(
									(option: { value: string; label: string }) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									)
								)}
							</select>
						</div>
					</div>
				</div>
				<div className="mx-auto w-full grid grid-cols-1 gap-y-4 md:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
					{selectedProduct?.map((product) => (
						<Card
							key={product.id}
							id={product.id}
							label={product.label}
							thumbnail_url={product.thumbnail_url}
							description={product.description}
							price={product.price}
							category_id={product.category_id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
