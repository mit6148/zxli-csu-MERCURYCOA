function main() {
  const profileId = window.location.search.substring(1);

  get("/api/user_papers", { user_id: profileId }, function(papers, err) {
    renderPaper(papers);
  });
  get("/api/user_comments", { user_id: profileId }, function(papers, err) {
    renderCommentPaper(papers);
  });
  get("/api/whoami", {}, function(user) {
    renderNavbar(user);
  });
}

function paperDOMObject(paperJSON) {
  commentDiv = document.createElement("div");
  commentDiv.setAttribute("id", paperJSON._id);
  commentDiv.className = "comment mb-2";

  commentCreatorSpan = document.createElement("a");
  commentCreatorSpan.className = "comment-creator";
  commentCreatorSpan.innerHTML = paperJSON.title;
  commentCreatorSpan.setAttribute("href", "/api/paper/" + paperJSON.fileName);

  commentDiv.appendChild(commentCreatorSpan);

  return commentDiv;
}

function renderPaper(papers, user) {
  const storiesDiv = document.getElementById("papers");
  console.log(papers);

  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }

  document.getElementById("new-paper").appendChild(newPaperDOMObject());
}

function renderCommentPaper(papers, user) {
  const storiesDiv = document.getElementById("commentpapers");
  console.log(papers);

  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }
}

main();

function newPaperDOMObject() {
  const newStoryDiv = document.createElement("div");
  newStoryDiv.className = "input-group my-3";

  const newStoryButtonDiv = document.createElement("div");
  newStoryButtonDiv.className = "input-group-append";
  newStoryDiv.appendChild(newStoryButtonDiv);

  const newStorySubmit = document.createElement("button");
  newStorySubmit.innerHTML = "Upload A New Paper";
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

  description.appendChild(desSpan);
}
