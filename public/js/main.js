function navigateTo(page, extension = "html") {
  if (typeof page === String) {
    window.location.href = `${page.trim()}.${extension}`;
  }
}

function setDocumentTitle(title = "Within your means") {
  document.querySelector("title").textContent = `Rizyk | ${title}`;
}

function showErrorSnackbar(error = true, text) {
  const snackbar = document.createElement("div");
  snackbar.classList.add("snackbar");
  if (error) {
    snackbar.classList.add("error-snackbar");
  } else {
    snackbar.classList.add("success-snackbar");
  }
  const message = document.createElement("h5");
  message.textContent = text;
  message.style.color = "#ffffff";
  message.style.fontWeight = "400";
  message.style.marginBlock = ".6em";
  snackbar.appendChild(message);
  document.querySelector("body").appendChild(snackbar);

  setTimeout(() => {
    document.querySelector("body").removeChild(snackbar);
  }, 8000);
}

// Chat
const responses = [];

function renderRow1() {
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
}

const proceedToPayBtn = document.querySelector("#proceed-to-pay");
if(proceedToPayBtn){
  proceedToPayBtn.addEventListener("click", (event) => {
    event.target.value = "Please wait...";
    event.target.style.opacity = ".4";
    setTimeout(() => {
      event.target.value = "Continue";
      event.target.style.opacity = "unset";
    }, 5000);
  });
}
