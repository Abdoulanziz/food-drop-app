export class HomePage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "open"});
    }

    // Do some setup
    connectedCallback() {
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
                                <img src="/assets/svg/menu.png" alt="menu icon" id="toggle-nav-drawer" data-target="nav-drawer" />
                                <img src="/assets/svg/bag.png" alt="shopping bag icon" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nav-drawer-menu" id="nav-drawer-menu">
                    <div class="nav-drawer-profile">
                        <div class="card flex">
                        <div class="image">
                            <div class="border-fill"></div>
                            <img src="/assets/img/profiledefault.png" alt="Profile picture" class="avatar" />
                        </div>
                        <h3 class="name" id="full-name">John Smith</h3>
                        <h6 class="user-email" id="email-primary">johnsmith@gmail.com</h6>
                        </div>
                    </div>
                    <ul class="nav-drawer-items">
                        <li class="nav-drawer-item flex">
                            <a href="/account/orders" class="flex">
                                <span class="left-icon-container flex"><div class="image-container flex"><img src="/assets/svg/orders.png" /></div> <span class="nav-drawer-link">Orders</span></span>
                                <span><img src="/assets/svg/angle-right.png" class="angle-right" /></span>
                            </a>
                        </li>
                        <li class="nav-drawer-item flex">
                            <a href="/account/settings" class="flex">
                                <span class="left-icon-container flex"><div class="image-container flex"><img src="/assets/svg/profile.png" /></div> <span class="nav-drawer-link">Profile</span></span>
                                <span><img src="/assets/svg/angle-right.png" class="angle-right" /></span>
                            </a>
                        </li>
                        <li class="nav-drawer-item flex">
                            <a href="/auth/signin" class="footer">
                                <span><i class="ti-power-off left"></i> <span class="nav-drawer-link">Signout</span></span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="main">
                    <div class="container">
                        <div class="deliver-to flex" style="justify-content: flex-start;gap: .6rem;margin-block-end: .4rem;">
                            <div>
                                <img src="/assets/svg/location.png" style="block-size: 38px; inline-size: 44px;" />
                            </div>
                            <div>
                                <h4 class="label">Deliver to</h4>
                                <h4 class="value flex">Sooner Suites <img src="/assets/svg/caret.png" alt="caret"> </h4>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <form class="search-form">
                            <div class="form-control flex">
                                <input type="text" id="search" placeholder="Search dishes, cafeterias" />
                                <img src="/assets/svg/magnifier.png" alt="search icon">
                            </div>
                        </form>
                    </div>
                    <div class="container">
                        <div class="title flex">
                            <h4 class="label left">Popular Dishes</h4>
                            <h4 class="value right flex">See All <img src="/assets/svg/angle-right.png" class="angle-right" /> </h4>
                        </div>
                    </div>
                    <div class="container">
                        <div class="dishes flex" style="margin-block-end: 0;">
                        <div class="dish card">
                            <div class="dish-img-wrapper">
                                <div class="dish-info-badge">Burgers</div>
                                <div class="dish-info-discount">-45%</div>
                            </div>
                            <div class="dish-info">
                                <h3>Greek House</h3>
                                <div class="dish-info-reaction flex">
                                    <img src="/assets/svg/like.svg" />
                                    <h5>96%</h5>
                                </div>
                            </div>
                        </div>
                        <div class="dish card">
                            <div class="dish-img-wrapper">
                                <div class="dish-info-badge">Burgers</div>
                            </div>
                            <div class="dish-info">
                                <h3>The Mont</h3>
                                <div class="dish-info-reaction flex">
                                    <img src="/assets/svg/like.svg" />
                                    <h5>96%</h5>
                                </div>
                            </div>
                        </div>
                        <div class="dish card">
                            <div class="dish-img-wrapper">
                                <div class="dish-info-badge">Burgers</div>
                            </div>
                            <div class="dish-info">
                                <h3>The Mont</h3>
                                <div class="dish-info-reaction flex">
                                    <img src="/assets/svg/like.svg" />
                                    <h5>96%</h5>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="title flex">
                            <h4 class="label left">Cafeterias Near You</h4>
                            <h4 class="value right flex">See All <img src="/assets/svg/angle-right.png" class="angle-right" /> </h4>
                        </div>
                    </div>
                    <div class="container">
                        <div class="restaurant-card-wrapper">
                            <div class="restaurant-card"></div>
                            <h3>Greek House</h3>
                            <h4>5min - Delivery time</h4>
                        </div>
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

            // Special to home page
            // Navdrawer
            const body = document.querySelector("body");
            const navDrawerMenu = this.root.querySelector("#nav-drawer-menu");
            const togglenavDrawer = this.root.querySelector("#toggle-nav-drawer");
            const pageOverlay = this.root.querySelector("#page-overlay");
            let isnavDrawerToggled = false;

            pageOverlay?.addEventListener("click", () => {
                if (!isnavDrawerToggled) {
                    isnavDrawerToggled = true;
                    body.style.overflowY = "hidden";
                    navDrawerMenu.style.display = "block";
                    pageOverlay.classList.toggle("d-none");
                } else {
                    isnavDrawerToggled = false;
                    body.style.overflowY = "auto";
                    navDrawerMenu.style.display = "none";
                    pageOverlay.classList.toggle("d-none");
                }
            });

            togglenavDrawer?.addEventListener("click", (event) => {
                if (!isnavDrawerToggled) {
                    isnavDrawerToggled = true;
                    body.style.overflowY = "hidden";
                    navDrawerMenu.style.display = "block";
                    pageOverlay.classList.toggle("d-none");
                    body.style.overflow = "hidden";
                } else {
                    isnavDrawerToggled = false;
                    body.style.overflowY = "auto";
                    navDrawerMenu.style.display = "none";
                    pageOverlay.classList.toggle("d-none");
                    body.style.overflow = "scroll";
                }
            });

        })();
        
    }


    // Do some cleanup
    disconnectedCallback(){
    }
}

customElements.define("home-page", HomePage);