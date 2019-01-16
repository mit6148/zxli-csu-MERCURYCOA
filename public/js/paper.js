function main() {




  const profileId = window.location.search.substring(1);

  //   get("/api/user", { id: profileId }, function(profileUser) {
  //     renderUserData(profileUser);
  //   });

    get("/api/user", { id: profileId }, function(profileUser) {
    renderPaperData(profileUser);
  });
  // const user = {
  //   _id: 'anonid',
  //   name: 'Anonymous',
  //   last_post: 'Anon was here',
  // };
  get("/api/whoami", {}, function(user) {
    renderNavbar(user);
  });
}
function newPaperDOMObject() {
  const newStoryDiv = document.createElement("div");
  newStoryDiv.className = "input-group my-3";

  //   const newStoryContent = document.createElement("input");
  //   newStoryContent.setAttribute("type", "text");
  //   newStoryContent.setAttribute("placeholder", "New Paper");
  //   newStoryContent.className = "form-control";
  //   newStoryContent.setAttribute("id", "story-content-input");
  //   newStoryDiv.appendChild(newStoryContent);

  const newStoryButtonDiv = document.createElement("div");
  newStoryButtonDiv.className = "input-group-append";
  newStoryDiv.appendChild(newStoryButtonDiv);

  const newStorySubmit = document.createElement("button");
  newStorySubmit.innerHTML = "Submit Comment";
  newStorySubmit.className = "btn btn-outline-primary";
  newStorySubmit.addEventListener("click", () => {
    window.location = "/uploadform";
  });

  newStoryButtonDiv.appendChild(newStorySubmit);

  const DownloadButton = document.createElement("div");
  DownloadButton.className = "input-group-append";
  newStoryDiv.appendChild(DownloadButton);

  const btnSubmit = document.createElement("button");
  btnSubmit.innerHTML = "Download";
  btnSubmit.className = "btn btn-outline-primary";
  btnSubmit.addEventListener("click", () => {
    window.location = "/download";
  });

  DownloadButton.appendChild(btnSubmit);

  return newStoryDiv;
}

// function submitStoryHandler() {
//   const newStoryInput = document.getElementById("story-content-input");

//   const data = {
//     content: newStoryInput.value
//   };
//   post("/api/uploadFile", data);
//   newStoryInput.value = "";
// }

function renderPaperData(user) {
  if (user._id !== undefined)
    document.getElementById("new-paper").appendChild(newPaperDOMObject());
  // rendering name
  const nameContainer = document.getElementById("name-container");
  const nameHeader = document.createElement("h1");
  nameHeader.innerHTML = user.name;
  nameContainer.appendChild(nameHeader);

  // rendering profile image
  //   const profileImage = document.getElementById("profile-image");
  //   profileImage.style =
  //     "background-image:url(https://i.pinimg.com/736x/98/e0/7d/98e07decc7c1ca58236995de3567e46a--cat-shirts-kitties-cutest.jpg)";

  // rendering latest post
  //rendering comment
  const comment = document.getElementById("comment-card");

  const commentSpan = document.createElement("a");
  commentSpan.className = "comment-creator card-title";
  commentSpan.innerHTML = user.name;
  commentSpan.setAttribute("href", "/u/profile?" + user._id);
  comment.appendChild(commentSpan);

  const commentItem = document.createElement("p");
  commentItem.className = "story-content card-text";
  commentItem.innerHTML = user.last_post;
  comment.appendChild(commentItem);

  // rendering description

  const description = document.getElementById("abstract-card");

  const desSpan = document.createElement("a");
  desSpan.className = "abstract card-title";
  desSpan.innerHTML = user.papers[0];
  desSpan.setAttribute("href", "/u/pdf");
  // desSpan.setAttribute("href", "https://www.youtube.com/watch?v=Mgto6wNuK4Y");
  // desSpan.setAttribute("href", "/u/profile?" + user._id);
  description.appendChild(desSpan);

  // render history

  const historyCard = document.getElementById("history-card");

  const historySpan = document.createElement("a");
  historySpan.className = "story-creator card-title";
  historySpan.innerHTML = "version-1";
  historySpan.setAttribute("href", "/pdf/myprofile.pdf");
  // historySpan.setAttribute("href", "/u/profile?" + user._id);
  historyCard.appendChild(historySpan);

  const latestPost = document.createElement("p");
  latestPost.className = "story-content card-text";
  latestPost.innerHTML = user.last_post;
  historyCard.appendChild(latestPost);


  //set up pdf link

  var url_string = window.location.href
  console.log(url_string.substring(url_string.lastIndexOf("/") + 1, url_string.length));
  var id = url_string.substring(url_string.lastIndexOf("/") + 1, url_string.length)
  const titleElement = document.getElementById("name-container");

  titleElement.setAttribute("href", '/pdf/'+id+'.pdf');

  //   const myPaper = document.getElementById("paper-container");
  //   get("/api/paper", { parent: "5c38f4241e4d643add432fbd" }, function(
  //     papersArr
  //   ) {
  //     for (let j = 0; j < papersArr.length; j++) {
  //       const currentPaper = papersArr[j];
  //       myPaper.appendChild(currentPaper);
  //     }
  //   });
}

main();
