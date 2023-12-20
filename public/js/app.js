import { HomePage } from "../components/HomePage.js";
import { CafeteriasPage } from "../components/CafeteriasPage.js";
import { CafeteriaPage } from "../components/CafeteriaPage.js";
import { OrdersPage } from "../components/OrdersPage.js";
import { SettingsPage } from "../components/SettingsPage.js";

window.app = {};

app.router = Router;
app.ui = UX;

window.addEventListener("DOMContentLoaded", async () => {
    // Router should be init first
    // UI depends on Router
    app.router.init();
    app.ui.init();
});


