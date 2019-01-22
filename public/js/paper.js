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
  console.log(fileName);
  console.log("^filename");

  //   get("/api/user", { id: profileId }, function(profileUser) {
  //     renderUserData(profileUser);
  //   });

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
    window.location = "/api/upload_comment_form";
  });

  newStoryButtonDiv.appendChild(newStorySubmit);

  const DownloadButton = document.createElement("div");
  DownloadButton.className = "input-group-append";
  newStoryDiv.appendChild(DownloadButton);

  const btnSubmit = document.createElement("a");
  btnSubmit.innerHTML = "Download";
  btnSubmit.className = "btn btn-outline-primary";
  // btnSubmit.setAttribute("href", "/static/pdf/" + fileName);

  btnSubmit.setAttribute("href", "/api/downloadpaper?fileName=" + fileName);
  // titleElement.setAttribute("href", "/api/viewpaper?fileName=" + fileName);

  // btnSubmit.addEventListener("click", () => {
  //   get("/download/" + fileName, {}, () => {
  //     console.log("helppp");
  //   });
  // });

  DownloadButton.appendChild(btnSubmit);

  return newStoryDiv;
}

// function storyDOMObject(storyJSON, user) {
//   const card = document.createElement("div");
//   card.setAttribute("id", storyJSON._id);
//   card.className = "story card";

//   const cardBody = document.createElement("div");
//   cardBody.className = "card-body";
//   card.appendChild(cardBody);

//   const creatorSpan = document.createElement("a");
//   creatorSpan.className = "story-creator card-title";
//   creatorSpan.innerHTML = storyJSON.creator_name;
//   creatorSpan.setAttribute("href", "/u/profile?" + storyJSON.creator_id);
//   cardBody.appendChild(creatorSpan);

//   const contentSpan = document.createElement("p");
//   contentSpan.className = "story-content card-text";
//   contentSpan.innerHTML = storyJSON.content;
//   cardBody.appendChild(contentSpan);

//   const cardFooter = document.createElement("div");
//   cardFooter.className = "card-footer";
//   card.appendChild(cardFooter);

//   const commentsDiv = document.createElement("div");
//   commentsDiv.setAttribute("id", storyJSON._id + "-comments");
//   commentsDiv.className = "story-comments";
//   cardFooter.appendChild(commentsDiv);

//   // if (user._id !== undefined)
//   cardFooter.appendChild(newCommentDOMObject(storyJSON._id));

//   return card;
// }

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
  // historySpan.setAttribute("href", "/pdf/myprofile.pdf");
  // historySpan.setAttribute("href", "/u/profile?" + user._id);
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
  // historySpan.setAttribute("href", "/pdf/myprofile.pdf");
  // historySpan.setAttribute("href", "/u/profile?" + user._id);
  historyCard.appendChild(historySpan);

  const viewsCard = document.getElementById("views-card");

  const viewsSpan = document.createElement("a");
  viewsSpan.className = "story-creator card-title";
  // console.log(paper);
  viewsSpan.innerHTML = paper.views;
  // historySpan.setAttribute("href", "/pdf/myprofile.pdf");
  // historySpan.setAttribute("href", "/u/profile?" + user._id);
  viewsCard.appendChild(viewsSpan);

  const downloadCard = document.getElementById("downloads-card");

  const downloadSpan = document.createElement("a");
  downloadSpan.className = "story-creator card-title";
  // console.log(paper);
  downloadSpan.innerHTML = paper.downloads;
  // historySpan.setAttribute("href", "/pdf/myprofile.pdf");
  // historySpan.setAttribute("href", "/u/profile?" + user._id);
  downloadCard.appendChild(downloadSpan);

  // const latestPost = document.createElement("p");
  // latestPost.className = "story-content card-text";
  // // latestPost.innerHTML = user.last_post;
  // historyCard.appendChild(latestPost);

  // var id = url_string.substring(url_string.lastIndexOf("/") + 1, url_string.length)
  const titleElement = document.getElementById("name-container");

  titleElement.innerHTML = paper.title;
  titleElement.setAttribute("href", "/api/viewpaper?fileName=" + fileName);

  // const myPaper = document.getElementById("stories");
  // get("/api/allpaper", { parent: "5c38f4241e4d643add432fbd" }, function(
  //   papersArr
  // ) {
  //   for (let j = 0; j < papersArr.length; j++) {
  //     const currentPaper = papersArr[j];
  //     myPaper.appendChild(currentPaper);
  //   }
  // });
}

main();
