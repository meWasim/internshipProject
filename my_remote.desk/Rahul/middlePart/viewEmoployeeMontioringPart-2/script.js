var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");
menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
});
var button = document.querySelector('.btn-success');

// Get the text content of the button
var buttonText = button.textContent.trim();

// Check if the text is "Undefined"
if (buttonText === 'Undefined') {
  // Change the background color of the button to yellow
  button.style.backgroundColor = 'yellow';
}