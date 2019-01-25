function main() {
  get("/api/whoami", {}, function(user) {
    renderNavbar(user);
  });
  alert("File upload successfully");
}
main();
