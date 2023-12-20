const UX = {
  // App root
  URLROOT: window.location.origin,

  // Initialize the UI
  init: () => {
    // Get all bottom navs
    const bottomNavCtas = document.querySelectorAll(".bottom-nav .nav-cta");
    bottomNavCtas.forEach(bottomNavCta => {
      bottomNavCta.addEventListener("click", event => {
        // Trigger navigation
        if(event.target.classList.contains("cta-icon")){
          UX.handleBottomNavClick(event);
        }
      });
    });

    // Get all back buttons
    const backButtons = document.querySelectorAll(".top-navbar .icon");
    backButtons.forEach(button => {
      if(button.getAttribute("id") !== "toggle-nav-drawer-icon"){
        button.addEventListener("click", () => {
          Router.goBack();
        })
      }
    });

    // Dashboard tabs
    const dashboardTabItems = Array.from(document.querySelectorAll(".service-statuses span"));
    dashboardTabItems.forEach((dashboardTabItem) => {
      const target = dashboardTabItem;
      target.addEventListener("click", UX.ordersTabItemClicked);
    });

    // Navdrawer
    const body = document.querySelector("body");
    const navDrawerMenu = document.querySelector("#nav-drawer-menu");
    const togglenavDrawer = document.querySelector("#toggle-nav-drawer");
    const pageOverlay = document.querySelector("#page-overlay");
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
        document.querySelector("body").style.overflow = "hidden";
      } else {
        isnavDrawerToggled = false;
        body.style.overflowY = "auto";
        navDrawerMenu.style.display = "none";
        pageOverlay.classList.toggle("d-none");
        document.querySelector("body").style.overflow = "scroll";
      }
    });

    // Chat sheet
    const startConversationBtn = document.querySelector("#chat-with-us-btn");
    const bottomSlider = document.querySelector("#bottom-slider");

    startConversationBtn?.addEventListener("click", () => {
      bottomSlider?.classList.remove("d-none");
      bottomSlider?.classList.add("slide");
      app.ui.startConversation()
    });

    const bottomSliderCloseBtn = document.querySelector("#cta-close-bottom-slider");
    bottomSliderCloseBtn?.addEventListener("click", () => {
      bottomSlider.classList.remove("slide");
    });

    // Render auth UI
    UX.renderAuthUI();
  },

  // Bottom navigation
  handleBottomNavClick: (event) => {
    const targetPage = event.target.parentElement.nextElementSibling.innerText;
    switch (targetPage) {
      case "Home":
        Router.go("/account/home");
        app.ui.init();
        break;

      case "Cafeterias":
        Router.go("/account/cafeterias");
        app.ui.init();
        app.ui.renderGoogleMap();
        break;

      case "Orders":
        Router.go("/account/orders");
        app.ui.init();
        app.ui.handleOrdersTabsSwitch();
        break;

      case "Profile":
        Router.go("/account/settings");
        app.ui.init();
        break;

      default:
        // TODO: Other URLs
    }
  },

  // Oredrs Tabs
  ordersTabItemClicked: (event) => {
    const selectCase = event.target.innerText.trim().toLowerCase();
    const tabs = document.querySelectorAll(".service-statuses span");

    tabs.forEach((tab, index) => {
      const isActive = index === ["orders", "complete", "pending"].indexOf(selectCase);
      tab.classList.toggle("active", isActive);
      tab.classList.toggle("bg-smoke", isActive);
    });

    const panels = {
      orders: document.querySelector("#orders"),
      complete: document.querySelector("#completed"),
      pending: document.querySelector("#pending"),
    };

    Object.keys(panels).forEach((key) => {
      const panel = panels[key];
      const isHidden = key !== selectCase;
      panel.classList.toggle("d-none", isHidden);
    });

    if (!["orders", "complete", "pending"].includes(selectCase)) {
      console.log("Error!");
    }
  },

  // Orders views
  handleOrdersTabsSwitch: () => {
    const tabs = document.querySelectorAll(".service-statuses span");
    tabs.forEach((tab) => {
      tab.addEventListener("click", UX.ordersTabItemClicked);
    });
  },

  // Render google map
  renderGoogleMap: () => {
    // Function to initialize the Google Map
    function initializeMap() {
        return new google.maps.Map(document.getElementById('map'), {
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

                        
                        <button style="margin-top: 30px; padding: 14px 16px; background-color: #fbb040; color: #fff; border: none; border-radius: 50%; cursor: pointer;">
                            <img src="/assets/svg/arrow-right.png" class="arrow-right-icon" />
                        </button>
                    </div>
                    
                </div>
            `;        

            clearAndAppendContent(restaurantItemTemplate);
        });

        return marker;
    }

    // Function to toggle the bottom slider
    function toggleBottomSlider() {
        const bottomSlider = document.querySelector("#bottom-slider");
        bottomSlider.classList.toggle("slide");
    }

    // Function to clear the content and append new content to the slider
    function clearAndAppendContent(content) {
        const bottomSlider = document.querySelector("#bottom-slider");
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
    const bottomSliderCloseBtn = document.querySelector("#cta-close-bottom-slider");
    if (bottomSliderCloseBtn) {
        bottomSliderCloseBtn.addEventListener("click", () => {
            toggleBottomSlider();
            clearAndAppendContent('');
        });
    }
  },

  // Handle support sheet
  startConversation: () => {
    const template = document.createElement("div");
    template.classList.add(...["chat-row"]);
    template.innerHTML = `
      <div>
          <img src="../assets/img/profiledefault.png" alt="Avatar" class="avatar" style="inline-size:46px; block-size:46px;">
          <div class="qn">
              <div class="a flex">
                  <div class="circle"></div>
                  <div class="circle"></div>
                  <div class="circle"></div>
              </div>
              <div class="b d-none">
                  <p>Would you hold as we connect you to our available agent?</p>
                  <button id="submit" class="btn btn-primary">Yeah sure! :)</button>
              </div>
          </div>
      </div>
      `;

    document.querySelector(".chat-form").append(template);
    const rows = document.querySelectorAll(".chat-row");

    setTimeout(() => {
      rows[0].querySelector(".a").classList.add("d-none");
      rows[0].querySelector(".b").classList.remove("d-none");
    }, 3000);

    document.querySelector(".btn").addEventListener("click", (e) => {
      e.preventDefault();
      // rows[0].classList.add("d-none");
      // renderRow2();
    });
    document.querySelector(".chat-form-content").scrollTop = document.querySelector(".chat-form-content").scrollHeight;
  },

  // Render auth interactons
  renderAuthUI: () => {
    const submitBtns = document.querySelectorAll("button");
    const submitBtnsLabels = {0: "Sign In", 1: "Sign Up", 2: "Submit"};

    submitBtns.forEach((submitBtn, index) => {
      submitBtn.innerHTML = submitBtnsLabels[index];
      submitBtn.style.opacity = "1";

      submitBtn.addEventListener("click", event => {
        event.target.innerHTML = '<span class="spinner"></span>Wait...';
        event.target.style.opacity = ".6";

        setTimeout(function() {
          event.target.innerHTML = submitBtnsLabels[index];
          event.target.style.opacity = "1";
          app.router.go("/account/home", false);

          app.router.init();
          app.ui.init();
        }, 2000);
      });
    });

    const signInPasswordInput = document.querySelector("#signin-password");
    const signInPasswordToggler = document.querySelector("#signin-password-toggler");
    let signInPasswordToggled = false;
    if(signInPasswordToggler){
      signInPasswordToggler.addEventListener("click", (event) => {
        if(signInPasswordInput.value.length != 0){
          if(signInPasswordToggled){
            signInPasswordToggled = false;
            event.target.src = "/assets/svg/eye.svg";
            signInPasswordInput.type = "password";
          }else{
            signInPasswordToggled = true;
            event.target.src = "/assets/svg/eye-off.svg";
            signInPasswordInput.type = "text";
          }
        }
      });
    }


    const signUpPasswordInput = document.querySelector("#signup-password");
    const signUpPasswordToggler = document.querySelector("#signup-password-toggler");
    let signUpPasswordToggled = false;
    if(signUpPasswordToggler){
      signUpPasswordToggler.addEventListener("click", (event) => {
        if(signUpPasswordInput.value.length != 0){
          if(signUpPasswordToggled){
            signUpPasswordToggled = false;
            event.target.src = "/assets/svg/eye.svg";
            signUpPasswordInput.type = "password";
          }else{
            signUpPasswordToggled = true;
            event.target.src = "/assets/svg/eye-off.svg";
            signUpPasswordInput.type = "text";
          }
        }
      });
    }



    document.querySelector("#trigger-auth-signin")?.addEventListener("click", () => {
      app.router.go("/auth/signin", false);
      app.ui.init();
    });

    document.querySelector("#trigger-auth-signup")?.addEventListener("click", () => {
      app.router.go("/auth/signup", false);
      app.ui.init();
    });

    document.querySelector("#trigger-auth-reset")?.addEventListener("click", () => {
      app.router.go("/auth/reset", false);
      app.ui.init();
    });



    document.querySelector("#auth-form-signin")?.addEventListener("submit", (event) => {
      event.preventDefault();
      app.router.go("/account/home");
      // app.ui.init();
    });



  }


}