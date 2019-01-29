function newNavbarItem(text, url) {
  const itemLink = document.createElement("a");
  itemLink.className = "nav-item nav-link";
  itemLink.href = url;
  const itemFont = document.createElement("h3");
  itemFont.innerHTML = text;
  itemLink.appendChild(itemFont);

  return itemLink;
}

function renderNavbar(user) {
  const navbarDivright = document.getElementById("nav-item-container-right");
  // navbarDivright.appendChild(newNavbarItem("Public Peer Review Platform", "/"));
  const navbarDivLeft = document.getElementById("nav-item-container-left");
  navbarDivLeft.appendChild(newNavbarItem("Home", "/"));

  // navbarDivLeft.appendChild(newNavbarItem("Community", "/feed"));
  navbarDivLeft.appendChild(
    newNavbarItem("Submission", "/api/upload_paper_form")
  );

  if (user._id !== undefined) {
    navbarDivLeft.appendChild(
      newNavbarItem("Dashboard", "/u/profile?" + user._id)
    );
    navbarDivLeft.appendChild(newNavbarItem("Logout", "/logout"));
  } else {
    navbarDivLeft.appendChild(newNavbarItem("Login", "/auth/google"));
  }
}
