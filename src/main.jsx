import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./assets/css/main.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Flowbite } from "flowbite-react";
import Routing from "./config/routing.config";
import { Provider } from "react-redux";
import store from "./config/store.config";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Flowbite theme={{ mode: "auto" }}>
      <Provider store={store}>
        <Routing />
      </Provider>
    </Flowbite>
  </StrictMode>
);
