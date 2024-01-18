import ReactDOM from "react-dom/client";
import Index from "./Index.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Index />
</BrowserRouter>
);
