function changeTheme() {
  let body = document.querySelector("body");
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    themeButton.textContent = "Light Theme";
  } else {
    themeButton.textContent = "Dark Theme";
  }
}
let themeButton = document.querySelector(".darkTheme");
themeButton.addEventListener("click", changeTheme);
