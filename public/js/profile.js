function main() {
  const profileId = window.location.search.substring(1);
  get("/api/user", { id: profileId }, function(profileUser) {
    renderUserData(profileUser);
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

  const newStoryButtonDiv = document.createElement("div");
  newStoryButtonDiv.className = "input-group-append";
  newStoryDiv.appendChild(newStoryButtonDiv);

  const newStorySubmit = document.createElement("button");
  newStorySubmit.innerHTML = "Submit Comment";
  newStorySubmit.className = "btn btn-outline-primary";
  newStorySubmit.addEventListener("click", () => {
    window.location = "/api/upload_paper_form";
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

function paperDOMObject(paperJSON) {
  commentDiv = document.createElement("div");
  commentDiv.setAttribute("id", paperJSON._id);
  commentDiv.className = "comment mb-2";

  commentCreatorSpan = document.createElement("a");
  commentCreatorSpan.className = "comment-creator";
  commentCreatorSpan.innerHTML = paperJSON.filename;
  // commentCreatorSpan.setAttribute("href", "/pdf/" + paperJSON.filename);
  commentCreatorSpan.setAttribute("href", "/paper");

  commentDiv.appendChild(commentCreatorSpan);

  commentContentSpan = document.createElement("span");
  commentContentSpan.className = "comment-content";
  commentContentSpan.innerHTML = " | " + paperJSON.abstract;
  commentDiv.appendChild(commentContentSpan);

  return commentDiv;
}
function renderUserData(user) {
  // rendering name
  const nameContainer = document.getElementById("name-container");
  const nameHeader = document.createElement("h1");
  nameHeader.innerHTML = user.name;
  nameContainer.appendChild(nameHeader);

  // rendering profile image
  const profileImage = document.getElementById("profile-image");

  // profileImage.style =
  //   "background-image:url(https://i.pinimg.com/736x/98/e0/7d/98e07decc7c1ca58236995de3567e46a--cat-shirts-kitties-cutest.jpg)";

  // rendering latest post
  const latestPostCard = document.getElementById("latest-post-card");

  const creatorSpan = document.createElement("a");
  creatorSpan.className = "story-creator card-title";
  creatorSpan.innerHTML = user.name;
  creatorSpan.setAttribute("href", "/u/profile?" + user._id);
  latestPostCard.appendChild(creatorSpan);

  const latestPost = document.createElement("p");
  latestPost.className = "story-content card-text";
  latestPost.innerHTML = user.last_post;
  latestPostCard.appendChild(latestPost);

  // rendering description

  const description = document.getElementById("description-card");

  const desSpan = document.createElement("a");
  desSpan.className = "description card-title";
  desSpan.innerHTML = user.papers[0];
  desSpan.setAttribute("href", "/paper");
  // desSpan.setAttribute("href", "https://www.youtube.com/watch?v=Mgto6wNuK4Y");
  // desSpan.setAttribute("href", "/u/profile?" + user._id);
  description.appendChild(desSpan);

  const myPaper = document.getElementById("mypapers");
  get("/api/mypaper", { parent: "5c38f4241e4d643add432fbd" }, function(
    papersArr
  ) {
    for (let j = 0; j < papersArr.length; j++) {
      const currentPaper = papersArr[j];
      myPaper.appendChild(paperDOMObject(currentPaper));
    }
    console.log(myPaper);
    // console.log(papersArr);
    // console.log(papersArr);
  });
  document.getElementById("new-paper").appendChild(newPaperDOMObject());
}

main();
