export class CafeteriasPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "open"});
    }

    // Do some setup
    connectedCallback() {
        // Fetch and apply styles here
        (async () => {
            const response1 = await fetch("/css/utils.css");
            const response2 = await fetch("/css/app.css");

            const css1 = await response1.text();
            const css2 = await response2.text();

            const styles = document.createElement("style");
            this.root.appendChild(styles);
            styles.textContent = css1 + css2;

            const template = document.createElement("template");
            const content = `
                <div class="top">
                    <div class="container">
                        <div class="top-navbar">
                            <div class="top-navbar-icons flex">
                                <div class="flex">
                                    <img src="/assets/svg/back.png" alt="back icon" class="icon back-icon" />
                                    <h4>Cafeterias</h4>
                                </div>
                                <san></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main">
                    <div id="restaurant-map-container">
                        <div id="map"></div>
                    </div>
                </div>
                <div class="bottom">
                <div class="bottom-nav" id="bottom-nav">
                    <div class="wrapper flex">
                    <div class="items flex">
                        <div class="item flex nav-cta">
                            <span class="cta"><img class="cta-icon icon" src="/assets/svg/home.png" /></span>
                            <span class="title">Home</span>
                        </div>
                        <div class="item flex nav-cta">
                            <span class="cta"><img class="cta-icon icon" src="/assets/svg/category.png" /></span>
                            <span class="title">Cafeterias</span>
                        </div>
                        <div class="item flex nav-cta">
                            <span class="cta"><img class="cta-icon icon" src="/assets/svg/orders.png" /></span>
                            <span class="title">Orders</span>
                        </div>
                        <div class="item flex nav-cta">
                            <span class="cta"><img class="cta-icon icon" src="/assets/svg/profile.png" /></span>
                            <span class="title">Profile</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="bottom-slider" id="bottom-slider">
                    <div class="wrapper flex">
                        <div class="title flex">
                            <span><i class="ti-location-pin" style="font-size: 32px;"></i></span>
                            <span id="cta-close-bottom-slider"><i class="ti-close"></i></span>
                        </div>
                        <div class="restaurant-data">
                        </div>
                    </div>
                </div>
                <div class="overlay d-none" id="page-overlay"></div>
            `;

            template.innerHTML = content;
            this.root.appendChild(template.content.cloneNode(true));

            const mainElement = this.root.querySelector(".main");
            mainElement.classList.add("section-template");
            setTimeout(() => {
                mainElement.classList.add("active");
            }, 100);


            // Get all bottom navs
            const bottomNavCtas = this.root.querySelectorAll(".bottom-nav .nav-cta");
            bottomNavCtas.forEach(bottomNavCta => {
                bottomNavCta.addEventListener("click", event => {
                    // Trigger navigation
                    if(event.target.classList.contains("cta-icon")){
                        UX.handleBottomNavClick(event);
                    }
                });
            });

            // Get all back buttons
            const backButtons = this.root.querySelectorAll(".top-navbar .icon");
            backButtons.forEach(button => {
                if(button.getAttribute("id") !== "toggle-nav-drawer-icon"){
                    button.addEventListener("click", () => {
                        Router.goBack();
                    })
                }
            });

        })();
        
    }


    // Do some cleanup
    disconnectedCallback(){
    }
}

customElements.define("cafeterias-page", CafeteriasPage);