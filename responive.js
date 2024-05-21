let bar = document.getElementById("bar");
let cross = document.getElementById("cross");
let navRight = document.getElementById("navRight");

if (bar) {
  bar.addEventListener("click", () => {
    navRight.classList.add("openBar");
  });
}
if (cross) {
  cross.addEventListener("click", () => {
    navRight.classList.remove("openBar");
  });
}
