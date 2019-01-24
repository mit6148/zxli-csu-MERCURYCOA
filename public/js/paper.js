function main() {
  // const fileName = window.location.search.substring(1);
  var url_string = window.location.href;
  console.log(
    url_string.substring(url_string.lastIndexOf("/") + 1, url_string.length)
  );
  var fileName = url_string.substring(
    url_string.lastIndexOf("/") + 1,
    url_string.length
  );

  get("/api/onepaper", { fileName: fileName }, function(paper) {
    renderPaperData(paper);
  });

  get("/api/whoami", {}, function(user) {
    renderNavbar(user);
  });
}
function newPaperDOMObject() {
  //set up pdf link

  var url_string = window.location.href;
  console.log(
    url_string.substring(url_string.lastIndexOf("/") + 1, url_string.length)
  );
  var fileName = url_string.substring(
    url_string.lastIndexOf("/") + 1,
    url_string.length
  );

  const newStoryDiv = document.createElement("div");
  newStoryDiv.className = "input-group my-3";

  const newStoryButtonDiv = document.createElement("div");
  newStoryButtonDiv.className = "input-group-append";
  newStoryDiv.appendChild(newStoryButtonDiv);

  const newStorySubmit = document.createElement("button");
  newStorySubmit.innerHTML = "Submit Comment";
  newStorySubmit.className = "btn btn-outline-primary";
  newStorySubmit.addEventListener("click", () => {
    window.location = "/api/upload_comment_form/" + fileName;
  });
  newStoryButtonDiv.appendChild(newStorySubmit);

  const newVersionButtonDiv = document.createElement("div");
  newVersionButtonDiv.className = "input-group-append";
  newStoryDiv.appendChild(newVersionButtonDiv);

  const newVersionSubmit = document.createElement("button");
  newVersionSubmit.innerHTML = "Update Version";
  newVersionSubmit.className = "btn btn-outline-primary";

  newVersionSubmit.addEventListener("click", () => {
    window.location = "/api/upload_version_form/" + fileName;
  });

  newVersionButtonDiv.appendChild(newVersionSubmit);

  const DownloadButton = document.createElement("div");
  DownloadButton.className = "input-group-append";
  newStoryDiv.appendChild(DownloadButton);

  const btnSubmit = document.createElement("a");
  btnSubmit.innerHTML = "Download";
  btnSubmit.className = "btn btn-outline-primary";
  // btnSubmit.setAttribute("href", "/static/pdf/" + fileName);

  btnSubmit.setAttribute("href", "/api/downloadpaper?fileName=" + fileName);

  DownloadButton.appendChild(btnSubmit);

  const newLikeButtonDiv = document.createElement("div");
  newLikeButtonDiv.className = "input-group-append";
  newStoryDiv.appendChild(newLikeButtonDiv);

  const newLikeSubmit = document.createElement("button");
  newLikeSubmit.innerHTML = "&hearts; Like";
  newLikeSubmit.className = "btn btn-outline-primary";

  newLikeSubmit.addEventListener("click", () => {
    // likes plus 1
  });

  newLikeButtonDiv.appendChild(newLikeSubmit);

  return newStoryDiv;
}

function renderPaperData(paper) {
  if (paper.fileName !== undefined)
    document.getElementById("new-paper").appendChild(newPaperDOMObject());
  //set up pdf link

  var url_string = window.location.href;
  console.log(
    url_string.substring(url_string.lastIndexOf("/") + 1, url_string.length)
  );
  var fileName = url_string.substring(
    url_string.lastIndexOf("/") + 1,
    url_string.length
  );
  // rendering name
  const nameContainer = document.getElementById("name-container");
  const nameHeader = document.createElement("h1");
  // nameHeader.innerHTML = user.name;
  nameContainer.appendChild(nameHeader);

  const comment = document.getElementById("comment-card");

  const commentSpan = document.createElement("a");
  commentSpan.className = "comment-creator card-title";
  commentSpan.innerHTML = paper.abstract;
  // commentSpan.setAttribute("href", "/u/profile?" + user._id);
  comment.appendChild(commentSpan);

  const commentItem = document.createElement("p");
  commentItem.className = "story-content card-text";
  // commentItem.innerHTML = user.last_post;
  comment.appendChild(commentItem);

  // rendering description

  const version_num = document.getElementById("abstract-card");
  const versionSpan = document.createElement("a");
  versionSpan.className = "story-creator card-title";
  console.log(paper);
  versionSpan.innerHTML = paper.papernumber;

  version_num.appendChild(versionSpan);

  const tag = document.createElement("div");
  tag.className = "card-footer";
  tag.innerHTML = paper.subject;

  version_num.appendChild(tag);

  const historyCard = document.getElementById("history-card");

  const historySpan = document.createElement("a");
  historySpan.className = "story-creator card-title";
  console.log(paper);
  historySpan.innerHTML = paper.abstract;

  historyCard.appendChild(historySpan);

  const viewsCard = document.getElementById("views-card");

  const viewsSpan = document.createElement("a");
  viewsSpan.className = "story-creator card-title";

  viewsSpan.innerHTML = paper.views;

  viewsCard.appendChild(viewsSpan);

  const downloadCard = document.getElementById("downloads-card");

  const downloadSpan = document.createElement("a");
  downloadSpan.className = "story-creator card-title";

  downloadSpan.innerHTML = paper.downloads;

  downloadCard.appendChild(downloadSpan);

  const titleElement = document.getElementById("name-container");

  titleElement.innerHTML = paper.title;
  titleElement.setAttribute("href", "/api/viewpaper?fileName=" + fileName);
}

main();
