export class ForgotPasswordPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "open"});
    }

    // Do some setup
    connectedCallback() {
        (async () => {
            const response1 = await fetch("/css/utils.css");
            const response2 = await fetch("/css/auth.css");

            const css1 = await response1.text();
            const css2 = await response2.text();

            const styles = document.createElement("style");
            this.root.appendChild(styles);
            styles.textContent = css1 + css2;

            const template = document.createElement("template");
            const content = `
                <div class="main" style="block-size:100vh;">
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
                      <button id="reset" type="submit" class="btn btn-primary form-control" style="border: 0;inline-size: 50%;background-color: #fbb040;color: #333;">Submit</button>
                    </div>
          
                    <div class="separator">
                      <span>Or</span>
                    </div>
          
                    <h4 class="possess-account">Already have an account? <span class="form-togglers" id="trigger-auth-signin" data-target="auth-signin">Sign In</span></h4>
          
                  </form>
                    </div>                 
                </div>
            `;

            template.innerHTML = content;
            this.root.appendChild(template.content.cloneNode(true));

            const mainElement = this.root.querySelector(".main");
            mainElement.classList.add("section-template");
            setTimeout(() => {
                mainElement.classList.add("active");
            }, 100);

        })();
        
    }


    // Do some cleanup
    disconnectedCallback(){
    }
}

customElements.define("forgot-password-page", ForgotPasswordPage);