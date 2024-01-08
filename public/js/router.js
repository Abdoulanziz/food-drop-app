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
                const signupPageComponent = document.createElement('signup-page');
                pageElement.appendChild(signupPageComponent);
                break;

            case "/auth/signin":
                pageElement = document.createElement('div');
                const signinPageComponent = document.createElement('signin-page');
                pageElement.appendChild(signinPageComponent);
                break;

            case "/auth/reset":
                pageElement = document.createElement('div');
                const forgotPasswordPageComponent = document.createElement('forgot-password-page');
                pageElement.appendChild(forgotPasswordPageComponent);
                break;

            case "/account/home":
                pageElement = document.createElement('div');
                const homePageComponent = document.createElement('home-page');
                pageElement.appendChild(homePageComponent);
                break;

            case "/account/cafeterias":
                pageElement = document.createElement('div');
                const cafeteriasPageComponent = document.createElement('cafeterias-page');
                pageElement.appendChild(cafeteriasPageComponent);
                break;

            case "/account/cafeteria":
                pageElement = document.createElement('div');
                const cafeteriaPageComponent = document.createElement('cafeteria-page');
                pageElement.appendChild(cafeteriaPageComponent);
                break;

            case "/account/orders":
                pageElement = document.createElement('div');
                const OrdersPageComponent = document.createElement('orders-page');
                pageElement.appendChild(OrdersPageComponent);
                break;               

            case "/account/settings":
                pageElement = document.createElement('div');
                const SettingsPageComponent = document.createElement('settings-page');
                pageElement.appendChild(SettingsPageComponent);
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