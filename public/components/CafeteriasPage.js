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

            // Render google map
            // Function to initialize the Google Map
            const mapDiv = this.root.querySelector('#map');
            const pageRoot = this.root;
            function initializeMap() {
                return new google.maps.Map(mapDiv, {
                    zoom: 15,
                    center: { lat: 35.2053, lng: -97.4417 },
                    gestureHandling: 'cooperative',
                    disableDefaultUI: true,
                });
            }

            // Function to create a marker for a restaurant
            function createMarker(map, restaurant) {
                const marker = new google.maps.Marker({
                    position: { lat: restaurant.lat, lng: restaurant.lng },
                    map,
                });

                marker.addListener('click', () => {
                    toggleBottomSlider();

                    const restaurantItemTemplate = `
                        <div class="restaurant-card-wrapper">
                            <div class="restaurant-card"></div>
                            <h3>${restaurant.name}</h3>
                            <h4>${restaurant.address}</h4>
                            <h4>5min - Delivery time</h4>
                            
                            <div style="display: flex; align-items: center;margin-block-end: 2.4rem;">
                                <div style="color: yellow; font-size: 26px;">★</div>
                                <div style="color: yellow; font-size: 26px;">★</div>
                                <div style="color: yellow; font-size: 26px;">★</div>
                                <div style="color: yellow; font-size: 26px;">★</div>
                                <div style="color: #ccc; font-size: 26px;">★</div>
                            </div>

                            <div style="text-align:center;">
                                <h2>Explore Our Menu Today</h2>
                                <h3>And fall in love with our foods prepared by well qualified chefs!</h3>

                                
                                <button id="go-to-cafeteria-btn" style="margin-top: 30px; padding: 8px 10px; background-color: #fbb040; color: #fff; border: none; border-radius: 50%; cursor: pointer;">
                                    <img src="/assets/svg/arrow-right.png" class="arrow-right-icon" />
                                </button>
                            </div>
                            
                        </div>
                    `;        

                    clearAndAppendContent(restaurantItemTemplate);

                    // Navigate to Cafeteria
                    const goToCafeteriaBtn = pageRoot.querySelector("#go-to-cafeteria-btn");
                    if(goToCafeteriaBtn) {
                        goToCafeteriaBtn.addEventListener("click", event => {
                            window.location.href = "/account/cafeteria";
                        });
                    }
                });

                return marker;
            }

            // Function to toggle the bottom slider
            function toggleBottomSlider() {
                const bottomSlider = pageRoot.querySelector("#bottom-slider");
                bottomSlider.classList.toggle("slide");
            }

            // Function to clear the content and append new content to the slider
            function clearAndAppendContent(content) {
                const bottomSlider = pageRoot.querySelector("#bottom-slider");
                const restaurantItem = document.createElement('div');
                restaurantItem.innerHTML = content;
                bottomSlider.querySelector(".restaurant-data").innerHTML = '';
                bottomSlider.querySelector(".restaurant-data").appendChild(restaurantItem);
            }

            // Function to initialize the list of restaurants
            function initializeRestaurants(map) {
                const restaurants = [
                    {
                        name: 'Pepe Delgado\'s Mexican Restaurant',
                        address: '1113 E Alameda St, Norman, OK 73069',
                        lat: 35.206346,
                        lng: -97.444375,
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/restaurant.png',
                    },
                    {
                        name: 'Louie\'s Grill & Bar',
                        address: '700 W Boyd St, Norman, OK 73069',
                        lat: 35.212210,
                        lng: -97.450920,
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/bar.png',
                    },
                    {
                        name: 'Hideaway Pizza',
                        address: '320 W Boyd St, Norman, OK 73069',
                        lat: 35.211998,
                        lng: -97.447489,
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/pizza.png',
                    },
                    {
                        name: 'Greek House',
                        address: '607 E Campus Corner Dr, Norman, OK 73069',
                        lat: 35.209913,
                        lng: -97.437739,
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/greek.png',
                    },
                    {
                        name: 'The Porch',
                        address: '430 W Main St, Norman, OK 73069',
                        lat: 35.210241,
                        lng: -97.446589,
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/cafe.png',
                    },
                    // ... Add more restaurants
                ];


                for (const restaurant of restaurants) {
                    const marker = createMarker(map, restaurant);

                    // Add click event listener to list item
                    marker.addListener('click', () => {
                        map.setCenter(marker.getPosition());
                    });
                }
            }

            // Main execution
            const map = initializeMap();
            initializeRestaurants(map);

            // Event listener for closing the bottom slider
            const bottomSliderCloseBtn = pageRoot.querySelector("#cta-close-bottom-slider");
            if (bottomSliderCloseBtn) {
                bottomSliderCloseBtn.addEventListener("click", () => {
                    toggleBottomSlider();
                    clearAndAppendContent('');
                });
            }

            

        })();
        
    }


    // Do some cleanup
    disconnectedCallback(){
    }
}

customElements.define("cafeterias-page", CafeteriasPage);