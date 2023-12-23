export class CafeteriaPage extends HTMLElement {
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
                                    <h4>Pepe Delgado's</h4>
                                </div>
                                <san></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main">
                    <div class="container">
                        <form class="search-form flex" style="justify-content: space-between;gap: .2rem;">
                            <div class="form-control flex">
                                <input type="text" id="search" placeholder="Search dishes" />
                                <img src="/assets/svg/magnifier.png" alt="search icon">
                            </div>
                            <div class="search-filter">
                                <img src="/assets/svg/filter.png" />
                            </div>
                        </form>
                    </div>
                    <div class="container">
                        <div class="title flex">
                            <h4 class="label left">All Dishes</h4>
                        </div>
                    </div>
                    <div class="container">
                        <div class="dishes grid" style="margin-block-end: 0;">
                            <div class="dish card">
                                <div class="dish-img-wrapper">
                                    <div class="dish-info-badge">Burgers</div>
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
                </div>
                <div class="bottom-slider" id="bottom-slider">
                    <div class="wrapper flex">
                        <div class="title flex">
                            <span><i class="ti-location-pin" style="font-size: 32px;"></i></span>
                            <span id="cta-close-bottom-slider"><img src="/assets/svg/icon-close.png" class="icon-close" /></span>
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

            // Get all back buttons
            const backButtons = this.root.querySelectorAll(".top-navbar .icon");
            backButtons.forEach(button => {
                if(button.getAttribute("id") !== "toggle-nav-drawer-icon"){
                    button.addEventListener("click", () => {
                        Router.goBack();
                    })
                }
            });

            // Function to toggle the bottom slider
            const pageRoot = this.root;
            function toggleBottomSlider() {
                const bottomSlider = pageRoot.querySelector("#bottom-slider");
                bottomSlider.classList.toggle("slide");
            }

            // Event listener for closing the bottom slider
            const bottomSliderCloseBtn = pageRoot.querySelector("#cta-close-bottom-slider");
            if (bottomSliderCloseBtn) {
                bottomSliderCloseBtn.addEventListener("click", () => {
                    toggleBottomSlider();
                    // clearAndAppendContent('');
                });
            }

            // Trigger bottom slider
            const bottomSliderTriggers = pageRoot.querySelectorAll(".dish-info h3");
            if (bottomSliderTriggers) {
                bottomSliderTriggers.forEach(trigger => trigger.addEventListener("click", () => {
                    toggleBottomSlider();
                    // clearAndAppendContent('');
                }));
            }

        })();
        
    }


    // Do some cleanup
    disconnectedCallback(){
    }
}

customElements.define("cafeteria-page", CafeteriaPage);