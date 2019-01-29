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

  // document.querySelector("html").classList.add("js");

  // var fileInput = document.querySelector(".input-file"),
  //   button = document.querySelector(".input-file-trigger"),
  //   the_return = document.querySelector(".file-return");

  // button.addEventListener("keydown", function(event) {
  //   if (event.keyCode == 13 || event.keyCode == 32) {
  //     fileInput.focus();
  //   }
  // });
  // button.addEventListener("click", function(event) {
  //   fileInput.focus();
  //   return false;
  // });
  // fileInput.addEventListener("change", function(event) {
  //   the_return.innerHTML = this.value;
  // });
}
main();
