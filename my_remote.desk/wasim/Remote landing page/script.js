// JavaScript to handle sidebar toggling and menu button position
const sidebar = document.getElementById('sidebar');
const menuButton = document.getElementById('menu-btn');

// Function to handle sidebar visibility
function toggleSidebar() {
  sidebar.classList.toggle('active-nav');
  adjustMenuButtonPosition();
}

// Function to adjust the position of the menu button
function adjustMenuButtonPosition() {
  const sidebarWidth = sidebar.offsetWidth;
  const menuButtonWidth = menuButton.offsetWidth;
  const marginLeft = sidebar.classList.contains('active-nav') ? sidebarWidth : 0;

  menuButton.style.left = `${marginLeft + 10}px`;
}

// Event listener for menu button click
menuButton.addEventListener('click', toggleSidebar);

// Function to handle sidebar visibility on window resize
function handleResize() {
  if (window.innerWidth >= 768) {
    sidebar.classList.add('active-nav');
  } else {
    sidebar.classList.remove('active-nav');
  }
  adjustMenuButtonPosition();
}

// Event listener for window resize
window.addEventListener('resize', handleResize);

// Initial handling of sidebar visibility and menu button position
handleResize();
