export class OrdersPage extends HTMLElement {
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
                                    <h4>My Orders</h4>
                                </div>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main">
                    <div class="container" style="background-color: inherit; margin: 0; padding-block-end: 0">
                        <div class="card dashboard">
                            <h4>View orders</h4>
                            <h2>Orders</h2>
                        <h6>No activity</h6>
                    
                        <div class="service-statuses flex">
                            <span class="active">Orders</span>
                            <span>Complete</span>
                            <span>Pending</span>
                        </div>
                    </div>
                </div>
                <div class="container cards">
                    <div id="cards-item" class="cards-item" style="margin-block-end: 6.6rem;">
                        <ul class="" id="orders" style="list-style-type: none;">
                            <h3 class="dashboard-category" style="margin-block-end: .4rem;">All orders (1)</h3>
                            <div class="cards-list" style="padding-inline: 0;">

                            <li class="cards-list-item-plain" style="padding-block: .4rem;">
                                <div class="content flex" style="justify-content: space-between;align-items: flex-end;">
                                <div>
                                    <img src="/assets/img/00.png" alt="" style="inline-size: 54px;block-size: 54px;border-radius: 9px;">
                                    <h3 style="color: #848484; font-weight: normal;">Pizza</h3>
                                </div>
                                <h4 style="color: #848484;">2h ago</h4>
                                </div>
                            </li>
                            </div>
                        </ul>
                        <ul class="d-none" id="completed" style="list-style-type: none;">
                            <h3 class="dashboard-category" style="margin-block-end: .4rem;">Orders Completed (10)</h3>
                            <div class="cards-list" style="padding-inline: 0;">
                                <li class="cards-list-item-plain" style="padding-block: .4rem;">
                                    <div class="content flex" style="justify-content: space-between;align-items: flex-end;">
                                    <div>
                                        <img src="/assets/img/salads.png" alt="" style="inline-size: 32px;block-size: 32px;">
                                        <h5>Pizza</h5>
                                        <h6>75 Pts</h6>
                                    </div>
                                    <h6>2h ago</h6>
                                    </div>
                                </li>
                            </div>
                        </ul>
                        <ul class="d-none" id="pending" style="list-style-type: none;">
                            <h3 class="dashboard-category" style="margin-block-end: .4rem;">Orders Pending (2)</h3>
                            <div class="cards-list" style="padding-inline: 0;">
                                <li class="cards-list-item-plain" style="padding-block: .4rem;">
                                    <div class="content flex" style="justify-content: space-between;align-items: flex-end;">
                                    <div>
                                        <img src="/assets/img/salads.png" alt="" style="inline-size: 32px;block-size: 32px;">
                                        <h5>Pizza</h5>
                                        <h6>75 Pts</h6>
                                    </div>
                                    <h6>2h ago</h6>
                                    </div>
                                </li>
                            </div>
                        </ul>
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

customElements.define("orders-page", OrdersPage);