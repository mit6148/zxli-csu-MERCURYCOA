function main() {
  get("/api/whoami", {}, function(user) {
    renderNavbar(user);
  });

  var url_string = window.location.href;
  console.log(
    url_string.substring(url_string.lastIndexOf("/") + 1, url_string.length)
  );
  var fileName = url_string.substring(
    url_string.lastIndexOf("/") + 1,
    url_string.length
  );

  document.getElementById("paper_parent").value = fileName;
}
main();
