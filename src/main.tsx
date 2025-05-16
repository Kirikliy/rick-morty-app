import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app/App";
import "./app/styles.css";
import "@/app/lib/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
