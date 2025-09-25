// login.js
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(getLanguage());

  document.getElementById("title").textContent = t("loginTitle");
  document.getElementById("label-email").textContent = t("email");
  document.getElementById("label-password").textContent = t("password");
  document.getElementById("btn-submit").textContent = t("btnLogin");

  const altEl = document.getElementById("alt");
  const lang = getLanguage();
  altEl.innerHTML = `${t("altRegister")} <a href="register.html">${
    lang === "ar" ? "تسجيل" : "Register"
  }</a>`;

  document.getElementById("lang-en").onclick = () => {
    setLanguage("en");
    location.reload();
  };
  document.getElementById("lang-ar").onclick = () => {
    setLanguage("ar");
    location.reload();
  };

  const form = document.getElementById("login-form");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "";

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      msg.textContent = t("fillFields");
      return;
    }

    const users = getUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      msg.textContent = t("emailNotFound");
      return;
    }

    if (user.password !== password) {
      msg.textContent = t("wrongPassword");
      return;
    }

    setLoggedIn(user.email);
    window.location.href = "home.html";
  });
});
