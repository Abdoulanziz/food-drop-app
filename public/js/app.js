// import {Home} from "./components/Home";

window.app = {};

app.router = Router;
app.ui = UX;

window.addEventListener("DOMContentLoaded", async () => {
    // Router should be init first
    // UI depends on Router
    app.router.init();
    app.ui.init();
});


