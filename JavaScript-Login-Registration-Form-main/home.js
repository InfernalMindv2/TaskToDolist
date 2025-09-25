// home.js
class Todo {
  constructor(text, completed = false) {
    this.id = Date.now() + Math.floor(Math.random() * 999);
    this.text = text;
    this.completed = completed;
  }
}
class TodoApp {
  constructor(user) {
    this.user = user;
    this.todos = Array.isArray(user.todos) ? user.todos : [];
    this.listEl = document.getElementById("todo-list");
    this.inputEl = document.getElementById("todo-input");
    this.formEl = document.getElementById("todo-form");

    this.formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.add(this.inputEl.value.trim());
    });

    this.render();
  }
  persist() {
    this.user.todos = this.todos;
    updateCurrentUser(this.user);
  }
  add(text) {
    if (!text) return;
    this.todos.push(new Todo(text));
    this.inputEl.value = "";
    this.persist();
    this.render();
  }
  toggle(id) {
    this.todos = this.todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.persist();
    this.render();
  }
  edit(id, newText) {
    if (!newText) return;
    this.todos = this.todos.map((t) =>
      t.id === id ? { ...t, text: newText } : t
    );
    this.persist();
    this.render();
  }
  delete(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.persist();
    this.render();
  }
  createItem(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => this.toggle(todo.id));

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;
    span.contentEditable = true;
    span.addEventListener("blur", () => {
      const newText = span.textContent.trim();
      if (newText && newText !== todo.text) this.edit(todo.id, newText);
      else span.textContent = todo.text;
    });
    if (todo.completed) span.style.textDecoration = "line-through";

    const del = document.createElement("button");
    del.textContent = "✖";
    del.addEventListener("click", () => {
      if (confirm("Delete this task?")) this.delete(todo.id);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(del);
    return li;
  }
  render() {
    this.listEl.innerHTML = "";
    if (!this.todos.length) {
      const p = document.createElement("p");
      p.textContent = t("noTasks");
      this.listEl.appendChild(p);
      return;
    }
    this.todos.forEach((todo) =>
      this.listEl.appendChild(this.createItem(todo))
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setLanguage(getLanguage());
  document.getElementById("title").textContent = t("todoTitle");
  document.getElementById("add-btn").textContent = t("add");
  document.getElementById("logout").textContent = t("logout");

  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  document.getElementById("welcome").textContent = `${t("welcome")}, ${
    user.first || user.email
  }`;

  document.getElementById("lang-en").onclick = () => {
    setLanguage("en");
    location.reload();
  };
  document.getElementById("lang-ar").onclick = () => {
    setLanguage("ar");
    location.reload();
  };

  document.getElementById("logout").onclick = () => {
    clearLoggedIn();
    window.location.href = "login.html";
  };

  new TodoApp(user);
});
