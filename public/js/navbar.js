function newNavbarItem(text, url) {
  const itemLink = document.createElement("a");
  itemLink.className = "nav-item nav-link";
  itemLink.innerHTML = text;
  itemLink.href = url;

  return itemLink;
}

function renderNavbar(user) {
  const navbarDiv = document.getElementById("nav-item-container");

  navbarDiv.appendChild(newNavbarItem("Home", "/"));
  navbarDiv.appendChild(newNavbarItem("Community", "/feed"));

  if (user._id !== undefined) {
    navbarDiv.appendChild(newNavbarItem("Dashboard", "/u/profile?" + user._id));
    navbarDiv.appendChild(newNavbarItem("Logout", "/logout"));
  } else {
    navbarDiv.appendChild(newNavbarItem("Login", "/auth/google"));
  }
}
