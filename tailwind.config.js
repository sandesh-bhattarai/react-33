/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
	darkMode: "class", 
	content: [
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx,html}',
		flowbite.content()
	],
	theme: {
		extend: {
			colors: {
				primary: {
					950: "#27042f", 
					900: "#37173f",
					800: "#472a4f",
					700: "#573d5f",
					600: "#675070",
					500: "#776380",
					400: "#877690",
					300: "#9789a0",
					200: "#a79cb0",
					100: "#b7acb0",
					50: "#c7bcd0"
				}
			}
		},
	},
	plugins: [
		flowbite.plugin(),
		require('flowbite/plugin')
	],
}

