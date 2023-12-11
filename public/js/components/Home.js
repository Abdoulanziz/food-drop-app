export class Home extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.root = this.shadowRoot;

        const template = document.createElement("div");
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
                        <span><i class="ti-link left"></i> <span class="nav-drawer-link">Orders</span></span>
                        <span><i class="ti-angle-right"></i></span>
                    </a>
                    </li>
                    <li class="nav-drawer-item flex">
                    <a href="/account/settings" class="flex">
                        <span><i class="ti-settings left"></i> <span class="nav-drawer-link">Settings</span></span>
                        <span><i class="ti-angle-right"></i></span>
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
                    <div class="deliver-to flex" style="justify-content: flex-start;gap: .4rem; ">
                        <div>
                            <i class="ti-location-pin" style="font-weight: bold;font-size: 38px;"></i>
                        </div>
                        <div>
                            <h4 class="label">Deliver to</h4>
                            <h4 class="value">Lamarquee Hostel <i class="ti-angle-down"></i> </h4>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <form class="search-form">
                        <div class="form-control flex">
                            <input type="text" id="search" placeholder="Search dishes, restaurants" />
                            <img src="/assets/svg/magnifier.png" alt="search icon">
                        </div>
                    </form>
                </div>
                <div class="container">
                    <div class="title flex">
                        <h4 class="label left">Popular Dishes</h4>
                        <h4 class="value right">See All <i class="ti-angle-right"></i> </h4>
                    </div>
                </div>
                <div class="container">
                    <div class="dishes flex" style="margin-block-end: 0;">
                    <div class="dish card">
                        <img src="/assets/img/salads.png" alt="">
                        <div class="dish-info">
                        <h5>Fresh Bugger</h5>
                        <h5>120 Pts</h5>
                        </div>
                        <div class="dish-ctas">
                        <div class="dish-ctas-wrapper flex">
                            <div class="increment">
                            <i class="ti-plus"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="dish card">
                        <img src="/assets/img/salads.png" alt="">
                        <div class="dish-info">
                        <h5>Pizza</h5>
                        <h5>75 Pts</h5>
                        </div>
                        <div class="dish-ctas">
                        <div class="dish-ctas-wrapper flex">
                            <div class="increment">
                            <i class="ti-plus"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="dish card">
                        <img src="/assets/img/salads.png" alt="">
                        <div class="dish-info">
                        <h5>Pizza</h5>
                        <h5>20 Pts</h5>
                        </div>
                        <div class="dish-ctas">
                        <div class="dish-ctas-wrapper flex">
                            <div class="increment">
                            <i class="ti-plus"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="container">
                    <div class="title flex">
                        <h4 class="label left">Restaurants Near You</h4>
                        <h4 class="value right">See All <i class="ti-angle-right"></i> </h4>
                    </div>
                </div>
                <div class="container">
                    <div class="restaurant-card-wrapper">
                        <div class="restaurant-card"></div>
                        <h3>Chillies restaurant</h3>
                        <h4>5min - Delivery time</h4>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="bottom-nav" id="bottom-nav">
                    <div class="wrapper flex">
                        <div class="items flex">
                            <div class="item flex nav-cta">
                                <span class="cta"><img class="cta-icon icon" src="/assets/svg/home-active.svg" /></span>
                                <span class="title active">Home</span>
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

        this.root.appendChild(template);
    }

    // Do some setup
    connectedCallback(){
    }

    // Do some cleanup
    disconnectedCallback(){
    }
}

customElements.define("fd-home", Home);