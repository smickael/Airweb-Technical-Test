export const centsToEuros = (amount: number) => {
	return new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
	}).format(amount / 100);
};
