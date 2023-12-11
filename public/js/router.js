const Router = {
    init: () => {
        document.querySelectorAll("a.nav-link").forEach(a => a.addEventListener("click", event => {
            event.preventDefault();
            const url = event.target.getAttribute("href");
            Router.go(url);
        }));

        // Event handler for url changes
        window.addEventListener("popstate", event => {
            // event has state object passed in  history.pushState({route}, "", route);
            Router.go(event.state.route, false); // false prevents pushing to history what is from history

            // Re-attach click event listeners
            // Use global var because UX is not directly available on Router
            app.ui.init();
        });

        // Go to the initial url
        Router.go(location.pathname);

    },
    
    go: (route, addToHistory=true) => {
        if(addToHistory){
            // Prevent adding same url consecutively
            if(route !== location.pathname) history.pushState({route}, "", route);
            // window.history.pushState({route}, "", route);
        }

        let pageElement = null;
        switch(route){
            case "/":
                pageElement = document.createElement('div');
                pageElement.innerHTML = `
                <div class="main" style="background-color:#333333;block-size:100vh;">
                    <div class="auth auth-signin">
                        <form class="auth-form flex" action="#" method="" id="auth-form-signin">
                
                        <h3 style="color: #b6b5b5;">Sign In</h3>
                
                        <div class="form-group">
                            <label for="signin-email">Email Address</label>
                            <input type="email" id="signin-email" name="emailPrimary" class="form-control" placeholder="Enter your email" autocomplete="username" required />
                        </div>
                
                        <div class="form-group">
                            <label for="signin-password">Password</label>
                            <div class="input-group toggleable-password">
                            <input type="password" id="signin-password" name="password" class="form-control" placeholder="Enter your password" autocomplete="current-password" required />
                            <img class="password-toggler" id="signin-password-toggler" src="/assets/svg/eye.svg" alt="Toggle password">
                            </div>
                        </div>
                
                        <div class="form-group form-checkbox-and-action">
                            <div class="form-check">
                            <input type="checkbox" id="remember-me" name="signin-checkbox" class="form-check-input" />
                            <label for="remember-me" class="form-check-label">Remember Me</label>
                            </div>
                            <h4 class="forgot-password form-togglers" id="trigger-auth-reset" data-target="auth-reset">Forgot Password</span></h4>
                        </div>
                
                        <div class="form-group submit-btn flex">
                            <button id="signin" type="submit" class="btn btn-primary form-control" style="border: 0;inline-size: 50%;">Sign In</button>
                        </div>
                
                        <div class="separator">
                            <span>Signin with</span>
                        </div>
                
                        <div class="auth-providers flex">
                            <div class="form-group auth-provider google-auth">
                            <label for="google-auth" class="form-check-label">
                                <svg aria-hidden="true" class="svg-icon" width="18" height="18" viewBox="0 0 18 18">
                                <g>
                                    <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4"></path>
                                    <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" fill="#34A853"></path>
                                    <path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" fill="#FBBC05"></path>
                                    <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" fill="#EA4335"></path>
                                </g>
                                </svg>
                                Google
                            </label>
                            </div>
                
                            <div class="form-group auth-provider facebook-auth">
                            <label for="facebook-auth" class="form-check-label">
                                <svg aria-hidden="true" class="svg-icon" width="18" height="18" viewBox="0 0 18 18">
                                <path
                                    d="M1.88 1C1.4 1 1 1.4 1 1.88v14.24c0 .48.4.88.88.88h7.67v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h4.08c.48 0 .88-.4.88-.88V1.88c0-.48-.4-.88-.88-.88H1.88z"
                                    fill="#fff"
                                ></path>
                                </svg>
                                Facebook
                            </label>
                            </div>
                        </div>
                
                        <h4 class="possess-account">Don't have an account? <span class="form-togglers" id="trigger-auth-signup" data-target="auth-signup">Sign Up</span></h4>
                
                        </form>
                    </div>                 
                </div>
                `;

                pageElement.querySelector(".main").classList.add("section-template");
                setTimeout(() => {
                    pageElement.querySelector(".main").classList.add("active");
                }, 100);
                break;


            case "/auth/signup":
                pageElement = document.createElement('div');
                pageElement.innerHTML = `
                <div class="main" style="background-color:#333333;block-size:100vh;">
                    <div class="auth auth-signin">
                    <form class="auth-form flex" action="#" method="" id="auth-form-signup">

                    <h3 style="color: #b6b5b5;">Sign Up</h3>
          
                    <div class="form-group">
                      <label for="signup-name">Full Name</label>
                      <input type="text" id="signup-name" name="fullName" class="form-control" placeholder="Enter your full name" autocomplete="name" required />
                    </div>
          
                    <div class="form-group">
                      <label for="signup-email">Email Address</label>
                      <input type="email" id="signup-email" name="emailPrimary" class="form-control" placeholder="Enter your email address" autocomplete="email" required />
                    </div>
          
                    <div class="form-group">
                      <label for="signup-password">Password</label>
                      <div class="input-group toggleable-password">
                        <input type="password" id="signup-password" name="password" class="form-control" placeholder="Create your password" required />
                        <img class="password-toggler" id="signup-password-toggler" src="/assets/svg/eye.svg" alt="Toggle password">
                      </div>
                    </div>
          
                    <div class="form-group form-checkbox-and-action">
                      <div class="form-check">
                        <input type="checkbox" id="agree-to-terms" name="signup-checkbox" class="form-check-input" required/>
                        <label for="agree-to-terms" class="form-check-label">I agree to the terms and conditions</label>
                      </div>
                    </div>
          
                    <div class="form-group submit-btn flex">
                      <button id="signup" type="submit" class="btn btn-primary form-control" style="border: 0;inline-size: 50%;">Sign Up</button>
                    </div>
          
                    <div class="separator">
                      <span>Signup with</span>
                    </div>
          
                    <div class="auth-providers flex">
                      <div class="form-group auth-provider google-auth">
                        <label for="google-auth" class="form-check-label">
                          <svg aria-hidden="true" class="svg-icon" width="18" height="18" viewBox="0 0 18 18">
                            <g>
                              <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4"></path>
                              <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" fill="#34A853"></path>
                              <path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" fill="#FBBC05"></path>
                              <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" fill="#EA4335"></path>
                            </g>
                          </svg>
                          Google
                        </label>
                      </div>
            
                      <div class="form-group auth-provider facebook-auth">
                        <label for="facebook-auth" class="form-check-label">
                          <svg aria-hidden="true" class="svg-icon" width="18" height="18" viewBox="0 0 18 18">
                            <path
                              d="M1.88 1C1.4 1 1 1.4 1 1.88v14.24c0 .48.4.88.88.88h7.67v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h4.08c.48 0 .88-.4.88-.88V1.88c0-.48-.4-.88-.88-.88H1.88z"
                              fill="#fff"
                            ></path>
                          </svg>
                          Facebook
                        </label>
                      </div>
                    </div>
          
                    <h4 class="possess-account">Already have an account? <span class="form-togglers" id="trigger-auth-signin" data-target="auth-signin">Sign In</span></h4>
          
                  </form>
                    </div>                 
                </div>
                `;

                pageElement.querySelector(".main").classList.add("section-template");
                setTimeout(() => {
                    pageElement.querySelector(".main").classList.add("active");
                }, 100);
                break;

            case "/auth/signin":
                pageElement = document.createElement('div');
                pageElement.innerHTML = `
                <div class="main" style="background-color:#333333;block-size:100vh;">
                    <div class="auth auth-signin">
                        <form class="auth-form flex" action="#" method="" id="auth-form-signin">
                
                        <h3 style="color: #b6b5b5;">Sign In</h3>
                
                        <div class="form-group">
                            <label for="signin-email">Email Address</label>
                            <input type="email" id="signin-email" name="emailPrimary" class="form-control" placeholder="Enter your email" autocomplete="username" required />
                        </div>
                
                        <div class="form-group">
                            <label for="signin-password">Password</label>
                            <div class="input-group toggleable-password">
                            <input type="password" id="signin-password" name="password" class="form-control" placeholder="Enter your password" autocomplete="current-password" required />
                            <img class="password-toggler" id="signin-password-toggler" src="/assets/svg/eye.svg" alt="Toggle password">
                            </div>
                        </div>
                
                        <div class="form-group form-checkbox-and-action">
                            <div class="form-check">
                            <input type="checkbox" id="remember-me" name="signin-checkbox" class="form-check-input" />
                            <label for="remember-me" class="form-check-label">Remember Me</label>
                            </div>
                            <h4 class="forgot-password form-togglers" id="trigger-auth-reset" data-target="auth-reset">Forgot Password</span></h4>
                        </div>
                
                        <div class="form-group submit-btn flex">
                            <button id="signin" type="submit" class="btn btn-primary form-control" style="border: 0;inline-size: 50%;">Sign In</button>
                        </div>
                
                        <div class="separator">
                            <span>Signin with</span>
                        </div>
                
                        <div class="auth-providers flex">
                            <div class="form-group auth-provider google-auth">
                            <label for="google-auth" class="form-check-label">
                                <svg aria-hidden="true" class="svg-icon" width="18" height="18" viewBox="0 0 18 18">
                                <g>
                                    <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4"></path>
                                    <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" fill="#34A853"></path>
                                    <path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" fill="#FBBC05"></path>
                                    <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" fill="#EA4335"></path>
                                </g>
                                </svg>
                                Google
                            </label>
                            </div>
                
                            <div class="form-group auth-provider facebook-auth">
                            <label for="facebook-auth" class="form-check-label">
                                <svg aria-hidden="true" class="svg-icon" width="18" height="18" viewBox="0 0 18 18">
                                <path
                                    d="M1.88 1C1.4 1 1 1.4 1 1.88v14.24c0 .48.4.88.88.88h7.67v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h4.08c.48 0 .88-.4.88-.88V1.88c0-.48-.4-.88-.88-.88H1.88z"
                                    fill="#fff"
                                ></path>
                                </svg>
                                Facebook
                            </label>
                            </div>
                        </div>
                
                        <h4 class="possess-account">Don't have an account? <span class="form-togglers" id="trigger-auth-signup" data-target="auth-signup">Sign Up</span></h4>
                
                        </form>
                    </div>                 
                </div>
                `;

                pageElement.querySelector(".main").classList.add("section-template");
                setTimeout(() => {
                    pageElement.querySelector(".main").classList.add("active");
                }, 100);
                break;

            case "/auth/reset":
                pageElement = document.createElement('div');
                pageElement.innerHTML = `
                <div class="main" style="background-color:#333333;block-size:100vh;">
                    <div class="auth auth-signin">
                    <form class="auth-form flex" action="#" id="auth-form-reset">
                    <div class="form-group">
                      <h3 class="auth-form-title">Oh! Sorry 😔</h3>
                      <h5 class="auth-form-sub-title">Request for a reset link.</h5>
                    </div>
          
                    <div class="form-group">
                      <label for="reset-email">Email Address</label>
                      <input type="email" id="reset-email" name="reset-email" class="form-control" placeholder="Enter your email address" autocomplete="email" required />
                    </div>
          
                    <div class="form-group submit-btn flex">
                      <button id="reset" type="submit" class="btn btn-primary form-control" style="border: 0;inline-size: 50%;">Submit</button>
                    </div>
          
                    <div class="separator">
                      <span>Or</span>
                    </div>
          
                    <h4 class="possess-account">Already have an account? <span class="form-togglers" id="trigger-auth-signin" data-target="auth-signin">Sign In</span></h4>
          
                  </form>
                    </div>                 
                </div>
                `;

                pageElement.querySelector(".main").classList.add("section-template");
                setTimeout(() => {
                    pageElement.querySelector(".main").classList.add("active");
                }, 100);
                break;

            case "/account/home":
                pageElement = document.createElement('div');
                pageElement.innerHTML = `
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

                pageElement.querySelector(".main").classList.add("section-template");
                setTimeout(() => {
                    pageElement.querySelector(".main").classList.add("active");
                }, 100);
                break;

            case "/account/cafeterias":
                pageElement = document.createElement('div');
                pageElement.innerHTML = `
                <div class="top">
                    <div class="container">
                        <div class="top-navbar">
                            <div class="top-navbar-icons flex">
                                <div class="flex">
                                    <img src="/assets/svg/back.png" alt="back icon" class="icon" />
                                    <h4>Cafeterias</h4>
                                </div>
                                <img src="/assets/svg/bag.png" alt="shopping bag icon" />
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
                            <span class="cta"><img class="cta-icon icon" src="/assets/svg/category-active.svg" /></span>
                            <span class="title active">Cafeterias</span>
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

                pageElement.querySelector(".main").classList.add("section-template");
                setTimeout(() => {
                    pageElement.querySelector(".main").classList.add("active");
                }, 100);
                break;


            case "/account/cafeteria":
                pageElement = document.createElement('div');
                pageElement.innerHTML = `
                <div class="top">
                    <div class="container">
                        <div class="top-navbar">
                            <div class="top-navbar-icons flex">
                                <div class="flex">
                                    <img src="/assets/svg/back.png" alt="back icon" class="icon" />
                                    <h4>Chillies Restaurant</h4>
                                </div>
                                <img src="/assets/svg/bag.png" alt="shopping bag icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main">
                    <div class="container">
                        <form class="search-form flex" style="justify-content: space-between;gap: .6rem;">
                            <div class="form-control flex" style="flex: 1;">
                                <img src="/assets/svg/magnifier.png" alt="search icon" style="margin-inline-start: .6rem; margin-inline-end: 0;">
                                <input type="text" id="search" placeholder="Search dishes" />
                            </div>
                            <div class="search-filter">
                                <i class="ti-filter"></i>
                            </div>
                        </form>
                    </div>
                    <div class="container">
                        <div class="dishes common-categories flex" style="margin-block-end: 0;">
                            <div class="common-category-card">
                                <h4>Pizzas</h4>
                            </div>
                            <div class="common-category-card">
                                <h4>Pizzas</h4>
                            </div>
                            <div class="common-category-card">
                                <h4>Pizzas</h4>
                            </div>
                            <div class="common-category-card">
                                <h4>Pizzas</h4>
                            </div>
                            <div class="common-category-card">
                                <h4>Pizzas</h4>
                            </div>
                            <div class="common-category-card">
                                <h4>Pizzas</h4>
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
                        </div>
                    </div>
                </div>
                <div class="bottom-slider" id="bottom-slider" style="block-size: 90% !important;">
                <div class="wrapper flex">
                    <div class="title flex">
                    <span></span>
                    <span id="cta-close-bottom-slider"><i class="ti-close"></i></span>
                    </div>
                    <div class="dish-data">
                    </div>
                </div>
                </div>
                <div class="overlay d-none" id="page-overlay"></div>
                `;

                pageElement.querySelector(".main").classList.add("section-template");
                setTimeout(() => {
                    pageElement.querySelector(".main").classList.add("active");
                }, 100);
                break;

            case "/account/orders":
                pageElement = document.createElement('div');
                pageElement.innerHTML = `
                <div class="top">
                    <div class="container">
                        <div class="top-navbar">
                            <div class="top-navbar-icons flex">
                                <div class="flex">
                                    <img src="/assets/svg/back.png" alt="back icon" class="icon" />
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
                            <h3 class="dashboard-category" style="margin-block-end: .4rem;">All orders (12)</h3>
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

                pageElement.querySelector(".main").classList.add("section-template");
                setTimeout(() => {
                    pageElement.querySelector(".main").classList.add("active");
                }, 100);
                break;                

            case "/account/settings":
                pageElement = document.createElement('div');
                pageElement.innerHTML = `
                <div class="top">
                    <div class="container">
                        <div class="top-navbar">
                            <div class="top-navbar-icons flex">
                                <div class="flex">
                                    <img src="/assets/svg/back.png" alt="back icon" class="icon" />
                                    <h4>My Profile</h4>
                                </div>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main">
                    <div class="container cards">
                    <div class="cards-item my-profile">
                        <div class="container" style="padding-inline: 0">
                        <div class="title flex" style="margin-block-end: .4rem;">
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
                            <h4 class="left">Email Address</h4>
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
                                <div class="icon icon-contact">
                                <img src="/assets/svg/mail.svg" alt="">
                                </div>
                                <div class="flex" style="align-items: flex-start; flex-direction: column">
                                <h5 class="label">Secondary Email</h5>
                                <h6 class="">
                                    Not provided
                                </h6>
                                </div>
                            </div>
                            <span><i class="ti-angle-right"></i></span>
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
                            <span><i class="ti-angle-right"></i></span>
                            </div>
                        </li>
                        <li class="cards-setting-item">
                            

                            <div class="content flex" style="justify-content: space-between;">
                            <div class="content flex">
                                <div class="icon icon-phone">
                                <img src="/assets/svg/phone.svg" alt="">
                                </div>
                                <div class="flex" style="align-items: flex-start; flex-direction: column">
                                <h5 class="label">Other number</h5>
                                <h6 class="">Not provided</h6>
                                </div>
                            </div>
                            <span><i class="ti-angle-right"></i></span>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>

                </div>

                <div class="overlay d-none" id="page-overlay"></div>
                `;

                pageElement.querySelector(".main").classList.add("section-template");
                setTimeout(() => {
                    pageElement.querySelector(".main").classList.add("active");
                }, 100);
                break;
            
            default:
                if(route.startsWith("/services/")){
                    const paramId = route.substring(route.lastIndexOf("/")+1);
                    pageElement = document.createElement('div');
                    pageElement.dataset.id = paramId;
                }    

        }

        const root = document.querySelector("#root");
        root.innerHTML = "";
        root.appendChild(pageElement);
        window.scrollX = 0;
        window.scrollY = 0;
    },

      // Go back to the last entered route
    goBack: () => {
        window.history.back();
    }
}
