export class SettingsPage extends HTMLElement {
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
                                    <h4>My Profile</h4>
                                </div>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main">
                    <div class="container cards" style="margin-block: 0;">
                    <div class="cards-item my-profile">
                        <div class="container" style="padding-inline: 0">
                            <div class="title flex" style="margin-block: 0 .4rem;">
                                <h4 class="left">Profile Info</h4>
                            </div>
                        </div>
                        <ul class="cards-list">
                            <li class="cards-setting-item" style="padding: 5px; justify-content: flex-start">
                                <div class="content flex" style="width: 100%; justify-content: flex-start">
                                    <img class="avatar" style="background-color: #f3f4f7; width: 50px; height: 50px;" src="/assets/img/profiledefault.png" />
                                    <div class="flex" style="align-items: flex-start; flex-direction: column">
                                        <h5 class="label">Ally Abdoulanziz</h5>
                                        <h6 class="label">Dar es Salaam, Tanzania</h6>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="container" style="padding-inline: 0">
                            <div class="title flex" style="margin-block-end: .4rem;">
                                <h4 class="left">Contact Info</h4>
                            </div>
                        </div>
                        <ul class="cards-list">
                            <li class="cards-setting-item" style="border-block-end: 1px solid #f4f4f4;">
                                <div class="content flex">
                                    <div class="icon icon-contact">
                                        <img src="/assets/svg/mail.svg" alt="">
                                    </div>
                                    <div class="flex" style="align-items: flex-start; flex-direction: column">
                                        <h5 class="label">Primary Email</h5>
                                        <h6 class="label">abdoulanzizally@outlook.com</h6>
                                    </div>
                                </div>
                            </li>
                            <li class="cards-setting-item">
                                <div class="content flex" style="justify-content: space-between;">
                                    <div class="content flex">
                                        <div class="icon icon-phone">
                                            <img src="/assets/svg/phone.svg" alt="">
                                        </div>
                                        <div class="flex" style="align-items: flex-start; flex-direction: column">
                                            <h5 class="label">Mobile number</h5>
                                            <h6 class="">+255 782 615 136</h6>
                                        </div>
                                    </div>
                                    <span><img src="/assets/svg/angle-right.png" class="angle-right" /></span>
                                </div>
                            </li>
                        </ul>
                        <div class="container" style="padding-inline: 0">
                            <div class="title flex" style="margin-block-end: .4rem;">
                                <h4 class="left">Other Preferences</h4>
                            </div>
                        </div>
                        <ul class="cards-list">
                            <li class="cards-setting-item" style="border-block-end: 1px solid #f4f4f4;">
                                <div class="settings-checkbox">
                                    <label for="make-deliveries">Make deliveries</label>
                                    <input type="checkbox" class="switch" id="make-deliveries">
                                </div>
                            </li>
                            <li class="cards-setting-item">
                                <div class="settings-checkbox">
                                    <label for="push-notifications">Push Notifications</label>
                                    <input type="checkbox" class="switch" id="push-notifications" checked>
                                </div>
                            </li>
                        </ul>
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

customElements.define("settings-page", SettingsPage);