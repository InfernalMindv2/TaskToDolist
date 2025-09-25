// auth.js
(function migrateLegacy() {
  try {
    const cur = localStorage.getItem("currentUser");
    const logged = localStorage.getItem("loggedInUser");
    if (cur && !logged) {
      try {
        const parsed = JSON.parse(cur);
        if (parsed && parsed.email) {
          localStorage.setItem("loggedInUser", parsed.email);
        } else if (typeof cur === "string") {
          localStorage.setItem("loggedInUser", cur);
        }
      } catch (e) {
        localStorage.setItem("loggedInUser", cur);
      }
    }
  } catch (e) {}
})();

function getUsers() {
  try {
    const raw = localStorage.getItem("users");
    const parsed = raw ? JSON.parse(raw) : [];
    return parsed.map((u) => ({
      first: u.first || "",
      last: u.last || "",
      email: (u.email || "").toLowerCase(),
      password: u.password || "",
      todos: Array.isArray(u.todos) ? u.todos : [],
    }));
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
function setLoggedIn(email) {
  if (!email) return;
  localStorage.setItem("loggedInUser", email.toLowerCase());
  localStorage.removeItem("currentUser");
}
function getLoggedIn() {
  return localStorage.getItem("loggedInUser");
}
function clearLoggedIn() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("currentUser");
}
function getCurrentUser() {
  const email = getLoggedIn();
  if (!email) return null;
  const users = getUsers();
  return users.find((u) => u.email === email.toLowerCase()) || null;
}
function updateCurrentUser(userObj) {
  if (!userObj || !userObj.email) return;
  const users = getUsers();
  const idx = users.findIndex((u) => u.email === userObj.email.toLowerCase());
  const clean = {
    first: userObj.first || "",
    last: userObj.last || "",
    email: userObj.email.toLowerCase(),
    password: userObj.password || "",
    todos: Array.isArray(userObj.todos) ? userObj.todos : [],
  };
  if (idx === -1) users.push(clean);
  else users[idx] = clean;
  saveUsers(users);
}
