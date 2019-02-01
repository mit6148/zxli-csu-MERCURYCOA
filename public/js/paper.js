function main() {
  var url_string = window.location.href;
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
function makeUL(array) {
  // Create the list element:
  var list = document.createElement("ul");

  for (var i = 0; i < array.length; i++) {
    // Create the list item:
    var item = document.createElement("li");
    var anchor = document.createElement("a");
    anchor.appendChild(document.createTextNode(array[i]));
    item.appendChild(anchor);
    // Set its contents:

    // Add it to the list:
    list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}

function renderPaperData(paper) {
  if (paper.fileName !== undefined)
    // document.getElementById("new-comment").appendChild(newButtonDOMObject());
    //set up pdf link

    var url_string = window.location.href;
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

  // comment.appendChild(makeUl(paper.comments));
  var ul = document.createElement("ul");

  for (var i = 0; i < paper.comments.length; i++) {
    var li = document.createElement("li");
    var anchor = document.createElement("a");
    anchor.className = "comment-creator card-title";
    const d = new Date(paper.comments[i].date);

    anchor.innerHTML = ` [ ${paper.comments[i].papernumber} ] |  ${
      paper.comments[i].title
    } | submitted at ${d.toLocaleDateString()}`;

    anchor.setAttribute("href", "/api/paper/" + paper.comments[i].fileName);
    // anchor.setAttribute("href", "/api/viewpaper?fileName=" + paper.comments[i]);
    li.appendChild(anchor);
    ul.appendChild(li);
  }
  comment.appendChild(ul);

  const version = document.getElementById("version-card");

  var ul = document.createElement("ul");

  for (var i = paper.versions.length - 1; i >= 0; i--) {
    var li = document.createElement("li");
    var anchor = document.createElement("a");
    anchor.className = "version card-title";
    const d = new Date(paper.versions[i].date);
    anchor.innerHTML = `version ${i} : [${paper.versions[i].papernumber}] | ${
      paper.versions[i].title
    }  | submitted at ${d.toLocaleDateString()}`;

    // anchor.setAttribute("href", "/api/viewpaper?fileName=" + paper.versions[i]);
    anchor.setAttribute("href", "/api/paper/" + paper.versions[i].fileName);
    li.appendChild(anchor);
    ul.appendChild(li);
  }
  version.appendChild(ul);

  // rendering abstract

  const version_num = document.getElementById("papernumber-card");
  version_num.className = "paper-number";
  const versionSpan = document.createElement("a");

  const d = new Date(paper.date);
  versionSpan.innerHTML = `${
    paper.papernumber
  }  (Submitted at ${d.toLocaleDateString()})`;
  versionSpan.setAttribute("href", "/api/viewpaper?fileName=" + fileName);

  version_num.appendChild(versionSpan);

  const tag = document.getElementById("subject-card");
  const tagSpan = document.createElement("span");
  tagSpan.className = "badge badge-light float-right";
  tagSpan.innerHTML = paper.subject;
  tag.appendChild(tagSpan);

  // const keywords = document.getElementById("keyword-card");
  // const kwSpan = document.createElement("span");
  // kwSpan.className = "badge badge-secondry";
  // kwSpan.innerHTML = paper.keywords;
  // keywords.appendChild(kwSpan);

  //
  const historyCard = document.getElementById("abstract-card");

  const historySpan = document.createElement("div");
  // historySpan.className = "story-creator card-title";
  historySpan.innerHTML = paper.abstract;

  historyCard.appendChild(historySpan);

  const methodCard = document.getElementById("method-card");

  const methodSpan = document.createElement("div");
  methodSpan.innerHTML = paper.method;

  methodCard.appendChild(methodSpan);

  const viewsCard = document.getElementById("views-card");

  const viewsSpan = document.createElement("span");
  // viewsSpan.className = "float-right views";

  viewsSpan.innerHTML = paper.views;

  viewsCard.appendChild(viewsSpan);

  const downloadCard = document.getElementById("downloads-card");

  const downloadSpan = document.createElement("span");
  // downloadSpan.className = "float-right downloads";

  downloadSpan.innerHTML = paper.downloads;

  downloadCard.appendChild(downloadSpan);

  const titleElement = document.getElementById("name-container");
  // titleElement.className = "float-left";

  titleElement.innerHTML = paper.title;
  titleElement.setAttribute("href", "/api/viewpaper?fileName=" + fileName);
  //
  // download button
  const DownloadDiv = document.getElementById("download-btn");

  // // download submit
  const btnSubmit = document.createElement("a");
  // const btnSubmit = document.createElement("a");
  btnSubmit.innerHTML = "Download";
  btnSubmit.className = "btn btn-info btn-sm";
  btnSubmit.setAttribute("href", "/api/downloadpaper?fileName=" + fileName);
  DownloadDiv.appendChild(btnSubmit);
  //

  const likeDiv = document.getElementById("likebtn");

  const likeButton = document.createElement("button");
  likeButton.innerHTML = "Recommend";
  likeButton.className = " btn btn-info btn-sm";
  likeButton.addEventListener("click", submitLikeHandler);

  likeDiv.appendChild(likeButton);

  function submitLikeHandler() {
    var url_string = window.location.href;
    var fileName = url_string.substring(
      url_string.lastIndexOf("/") + 1,
      url_string.length
    );
    const data = {
      fileName: fileName
    };

    post("/api/likes/", data);
  }

  const likeCard = document.getElementById("likes-card");

  const likeSpan = document.createElement("span");
  // downloadSpan.className = "float-right downloads";

  likeSpan.innerHTML = paper.likes;

  likeCard.appendChild(likeSpan);

  //catbook - feed.js - submitCommentHandler
  // // add download submit to button
  // DownloadButton.appendChild(btnSubmit);

  const author = document.getElementById("author");
  author.className = "paper-author";
  author.innerHTML = paper.author;

  // document.getElementById("new-comment").appendChild(newButtonDOMObject());

  const commentButton = document.getElementById("new-comment");
  // commentButton.className = "input-group my-3";

  const newComSubmit = document.createElement("button");
  newComSubmit.innerHTML = "Comment this paper";
  newComSubmit.className = "btn btn-info btn-lg";
  // newComSubmit.className = "btn btn-outline-primary";
  newComSubmit.addEventListener("click", () => {
    window.location = "/api/upload_comment_form/" + fileName;
  });
  commentButton.appendChild(newComSubmit);

  // function newButtonDOMObject() {
  //   //set up file link

  //   var url_string = window.location.href;
  //   var fileName = url_string.substring(
  //     url_string.lastIndexOf("/") + 1,
  //     url_string.length
  //   );

  //   // new story

  //   const newStoryDiv = document.createElement("div");
  //   newStoryDiv.className = "input-group my-3";

  //   // create button
  //   const newStoryButtonDiv = document.createElement("div");
  //   newStoryButtonDiv.className = "input-group-append";
  //   newStoryDiv.appendChild(newStoryButtonDiv);

  //   // create submit
  //   const newStorySubmit = document.createElement("button");
  //   newStorySubmit.innerHTML = "Submit Comment";
  //   newStorySubmit.className = "btn btn-outline-primary";
  //   newStorySubmit.addEventListener("click", () => {
  //     window.location = "/api/upload_comment_form/" + fileName;
  //   });
  //   // add submit to button
  //   newStoryButtonDiv.appendChild(newStorySubmit);

  //   return newStoryDiv;
  // }

  // // version button
  // const newVersionButtonDiv = document.createElement("div");
  // newVersionButtonDiv.className = "input-group-append";
  // newStoryDiv.appendChild(newVersionButtonDiv);

  // // verson submit
  // const newVersionSubmit = document.createElement("button");
  // newVersionSubmit.innerHTML = "Update Version";
  // newVersionSubmit.className = "btn btn-outline-primary";

  // newVersionSubmit.addEventListener("click", () => {
  //   window.location = "/api/upload_version_form/" + fileName;
  // });
  // // add version submit to button
  // newVersionButtonDiv.appendChild(newVersionSubmit);

  // // download button
  // const DownloadButton = document.createElement("div");
  // DownloadButton.className = "input-group-append";
  // newStoryDiv.appendChild(DownloadButton);

  // // download submit
  // const btnSubmit = document.createElement("a");
  // btnSubmit.innerHTML = "Download";
  // btnSubmit.className = "btn btn-outline-primary";
  // btnSubmit.setAttribute("href", "/api/downloadpaper?fileName=" + fileName);
  // // add download submit to button
  // DownloadButton.appendChild(btnSubmit);
}

main();
