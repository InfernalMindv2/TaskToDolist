// lang.js
const texts = {
  en: {
    loginTitle: "Sign In",
    registerTitle: "Register",
    email: "Email",
    password: "Password",
    first: "First Name",
    last: "Last Name",
    btnLogin: "Sign In",
    btnRegister: "Register",
    altLogin: "Already have an account?",
    altRegister: "Don't have an account?",
    todoTitle: "Todo List",
    welcome: "Welcome",
    add: "Add",
    logout: "Logout",
    noTasks: "No tasks yet",
    fillFields: "Please fill all fields",
    emailNotFound: "Email not found. Please register first.",
    wrongPassword: "Incorrect password",
    emailExists: "Email already exists",
  },
  ar: {
    loginTitle: "تسجيل الدخول",
    registerTitle: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    first: "الاسم الأول",
    last: "اسم العائلة",
    btnLogin: "دخول",
    btnRegister: "تسجيل",
    altLogin: "هل لديك حساب بالفعل؟",
    altRegister: "ليس لديك حساب؟",
    todoTitle: "قائمة المهام",
    welcome: "مرحبًا",
    add: "إضافة",
    logout: "تسجيل خروج",
    noTasks: "لا توجد مهام حتى الآن",
    fillFields: "يرجى ملء جميع الحقول",
    emailNotFound: "البريد الإلكتروني غير موجود. الرجاء التسجيل أولاً.",
    wrongPassword: "كلمة المرور خاطئة",
    emailExists: "البريد الإلكتروني مسجل بالفعل",
  },
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.body.classList.toggle("rtl", lang === "ar");
}
function getLanguage() {
  return localStorage.getItem("lang") || "en";
}
function t(key) {
  const lang = getLanguage();
  return (texts[lang] && texts[lang][key]) || texts.en[key] || "";
}
