import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";

type Theme = {
	isDarkMode: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<Theme>({
	isDarkMode: false,
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: any }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode((oldValue) => {
			const isDarkMode = !oldValue;
			localStorage.setItem("theme", isDarkMode ? "dark" : "");
			if (isDarkMode) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			return isDarkMode;
		});
	};

	useEffect(() => {
		if (
			localStorage.getItem("theme") === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, []);

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => {
	return useContext(ThemeContext);
};
