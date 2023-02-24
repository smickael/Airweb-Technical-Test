import "./App.css";
import {
	Outlet,
	ReactRouter,
	RootRoute,
	Route,
	RouterProvider,
} from "@tanstack/react-router";
import { Footer, Header } from "./components";
import { CartProvider } from "./context";
import { CartScreen, ProductsScreen } from "./screens";
import { ThemeProvider } from "./context/themeContext";

export const rootRoute = new RootRoute({
	component: () => <Outlet />,
});

const ProductsRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/",
	component: ProductsScreen,
});

const CartRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/cart",
	component: CartScreen,
});

const routeTree = rootRoute.addChildren([ProductsRoute, CartRoute]);

const router = new ReactRouter({ routeTree });

export function App() {
	return (
		<CartProvider>
			<ThemeProvider>
				<div className="bg-slate-50 dark:bg-slate-800">
					<div className="min-h-screen mx-auto items-start max-w-7xl xl:items-center flex flex-col justify-between">
						<Header />
						<div className="w-full mb-auto px-4 flex-1">
							<RouterProvider router={router} />
						</div>
						<Footer />
					</div>
				</div>
			</ThemeProvider>
		</CartProvider>
	);
}
