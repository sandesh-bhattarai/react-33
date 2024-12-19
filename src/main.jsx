import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./assets/css/main.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Flowbite } from "flowbite-react";
import Routing from "./config/routing.config";


createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Flowbite theme={{mode: "auto"}}>
			<Routing />
		</Flowbite>
	</StrictMode>
);
