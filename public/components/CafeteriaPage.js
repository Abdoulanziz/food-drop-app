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
                                    <h4>Greek House</h4>
                                </div>
                                <san></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main">
                    <div class="container">
                        <form class="search-form">
                            <div class="form-control flex">
                                <input type="text" id="search" placeholder="Search dishes" />
                                <img src="/assets/svg/magnifier.png" alt="search icon">
                            </div>
                        </form>
                    </div>
                    <div class="container">
                        <div class="dishes common-categories flex" style="margin-block-end: 0;">
                            <div class="common-category-card active">
                                <h4>Burgers</h4>
                            </div>
                            <div class="common-category-card">
                                <h4>Snacks</h4>
                            </div>
                            <div class="common-category-card">
                                <h4>Sandwich</h4>
                            </div>
                            <div class="common-category-card">
                                <h4>Pizzas</h4>
                            </div>
                            <div class="common-category-card">
                                <h4>Grill</h4>
                            </div>
                            <div class="common-category-card">
                                <h4>Fastfood</h4>
                            </div>
                        </div>
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
                                    <div class="dish-info-badge">Burger</div>
                                </div>
                                <div class="dish-info">
                                    <h3>12 Pts</h3>
                                    <div class="dish-info-reaction flex">
                                        <img src="/assets/svg/like.svg" />
                                        <h5>86% (14)</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="dish card">
                                <div class="dish-img-wrapper">
                                    <div class="dish-info-badge">Burger</div>
                                </div>
                                <div class="dish-info">
                                    <h3>50 Pts</h3>
                                    <div class="dish-info-reaction flex">
                                        <img src="/assets/svg/like.svg" />
                                        <h5>90% (68)</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="dish card">
                                <div class="dish-img-wrapper">
                                    <div class="dish-info-badge">Burger</div>
                                </div>
                                <div class="dish-info">
                                    <h3>10 Pts</h3>
                                    <div class="dish-info-reaction flex">
                                        <img src="/assets/svg/like.svg" />
                                        <h5>76% (100+)</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="dish card">
                                <div class="dish-img-wrapper">
                                    <div class="dish-info-badge">Burger</div>
                                </div>
                                <div class="dish-info">
                                    <h3>30 Pts</h3>
                                    <div class="dish-info-reaction flex">
                                        <img src="/assets/svg/like.svg" />
                                        <h5>91% (55)</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="dish card">
                                <div class="dish-img-wrapper">
                                    <div class="dish-info-badge">Burger</div>
                                </div>
                                <div class="dish-info">
                                    <h3>17 Pts</h3>
                                    <div class="dish-info-reaction flex">
                                        <img src="/assets/svg/like.svg" />
                                        <h5>74% (45)</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="dish card">
                                <div class="dish-img-wrapper">
                                    <div class="dish-info-badge">Burger</div>
                                </div>
                                <div class="dish-info">
                                    <h3>68 Pts</h3>
                                    <div class="dish-info-reaction flex">
                                        <img src="/assets/svg/like.svg" />
                                        <h5>80% (100+)</h5>
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
                        <div class="dish-add-to-cart-sheet">
                            <img src="/assets/img/00.png" alt="Product Image">
                            <h2>Burger</h2>
                            <p>Price: <span class="dish-price">12 Pts</span></p>
                            <div class="quantity">
                                <span class="decrement decrement-cta">-</span>
                                <input type="text" class="quantity-input" value="1">
                                <span class="increment increment-cta">+</span>
                            </div>
                            <button class="add-to-cart">Add To Cart</button>
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

            const commonCategoryCards = pageRoot.querySelectorAll('.common-category-card');
            commonCategoryCards.forEach(card => {
                card.addEventListener('click', () => {
                    commonCategoryCards.forEach(innerCard => {
                        innerCard.classList.remove('active');
                    });
                    card.classList.add('active');
                });
            });

        })();
        
    }


    // Do some cleanup
    disconnectedCallback(){
    }
}

customElements.define("cafeteria-page", CafeteriaPage);