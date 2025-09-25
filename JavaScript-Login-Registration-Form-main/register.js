// register.js
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(getLanguage());

  document.getElementById("title").textContent = t("registerTitle");
  document.getElementById("label-first").textContent = t("first");
  document.getElementById("label-last").textContent = t("last");
  document.getElementById("label-email").textContent = t("email");
  document.getElementById("label-password").textContent = t("password");
  document.getElementById("btn-submit").textContent = t("btnRegister");

  const altEl = document.getElementById("alt");
  const lang = getLanguage();
  altEl.innerHTML = `${t("altLogin")} <a href="login.html">${
    lang === "ar" ? "تسجيل الدخول" : "Sign In"
  }</a>`;

  document.getElementById("lang-en").onclick = () => {
    setLanguage("en");
    location.reload();
  };
  document.getElementById("lang-ar").onclick = () => {
    setLanguage("ar");
    location.reload();
  };

  const form = document.getElementById("register-form");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "";

    const first = document.getElementById("first").value.trim();
    const last = document.getElementById("last").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (!first || !last || !email || !password) {
      msg.textContent = t("fillFields");
      return;
    }

    let users = getUsers();
    if (users.find((u) => u.email === email)) {
      msg.textContent = t("emailExists");
      return;
    }

    const newUser = { first, last, email, password, todos: [] };
    users.push(newUser);
    saveUsers(users);

    setLoggedIn(email);
    window.location.href = "home.html";
  });
});
