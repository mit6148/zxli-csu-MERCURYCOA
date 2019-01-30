function main() {
  get("/api/whoami", {}, function(user) {
    renderNavbar(user);
  });

  get("/api/success", {}, function(data) {
    renderBtn(data);
  });
  renderBtn();
}

main();

function renderBtn(data) {
  const homeDiv = document.getElementById("home-btn");
  const homeBtn = document.createElement("button");
  homeBtn.innerHTML = "Home";
  homeBtn.setAttribute("href", "/");
  homeDiv.appendChild(homeBtn);

  const submitDiv = document.getElementById("submit-btn");
  const submitBtn = document.createElement("button");
  submitBtn.innerHTML = "Sumbit more";
  submitBtn.setAttribute("href", "/api/upload_paper_form");
  submitDiv.appendChild(submitBtn);

  homeDiv.append(submitDiv);

  return homeDiv;
}
