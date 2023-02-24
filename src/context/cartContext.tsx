import { createContext, useContext, useReducer, useState } from "react";
import { cartQuantityLimit } from "../config";

type Cart = {
	[key: string]: {
		quantity: number;
	};
};

type CartActions = {
	type: CartActionsKind;
	payload: {
		id: string;
		quantity?: number;
	};
};

const CartContext = createContext<{
	cart: Cart;
	addToCart: (payload: CartActions["payload"]) => void;
	removeFromCart: (id: CartActions["payload"]["id"]) => void;
	updateCart: (payload: Required<CartActions["payload"]>) => void;
}>({
	cart: {},
	addToCart: () => {},
	removeFromCart: () => {},
	updateCart: () => {},
});

enum CartActionsKind {
	"ADD" = "ADD",
	"DELETE" = "DELETE",
	"REMOVE" = "REMOVE",
	"UPDATE" = "UPDATE",
}

const initialState: Cart = {};

const updateReducer = (state: Cart) => {
	sessionStorage.setItem("cart", JSON.stringify(state));
	return state;
};

const cartReducer = (state: Cart, actions: CartActions) => {
	const { type, payload } = actions;
	const quantity = state[payload.id]?.quantity;
	switch (type) {
		case CartActionsKind.ADD:
			return updateReducer({
				...state,
				[payload.id]: {
					quantity: quantity
						? quantity < cartQuantityLimit
							? quantity + 1
							: quantity
						: 1,
				},
			});
		case CartActionsKind.REMOVE:
			const newState = { ...state };
			delete newState[payload.id];

			return updateReducer(newState);
		case CartActionsKind.UPDATE:
			if (!state[payload.id] || quantity === undefined) return state;
			else if (payload.quantity === 0) {
				const newState = { ...state };

				delete newState[payload.id];
				return updateReducer(newState);
			}
			return updateReducer({
				...state,
				[payload.id]: {
					quantity: payload.quantity!,
				},
			});
		default:
			return state;
	}
};

const init = () => {
	const cart = sessionStorage.getItem("cart");
	return cart ? JSON.parse(cart) : initialState;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [cart, dispatch] = useReducer(cartReducer, initialState, init);

	const addToCart = (payload: CartActions["payload"]) => {
		dispatch({
			type: CartActionsKind.ADD,
			payload,
		});
	};

	const removeFromCart = (id: CartActions["payload"]["id"]) => {
		dispatch({
			type: CartActionsKind.REMOVE,
			payload: { id },
		});
	};

	const updateCart = (payload: Required<CartActions["payload"]>) => {
		dispatch({
			type: CartActionsKind.UPDATE,
			payload,
		});
	};

	return (
		<CartContext.Provider
			value={{ addToCart, removeFromCart, updateCart, cart }}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => {
	return useContext(CartContext);
};
