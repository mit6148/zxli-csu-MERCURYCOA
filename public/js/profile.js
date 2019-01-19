function main() {
  const profileId = window.location.search.substring(1);
  // get("/api/user", { id: profileId }, function(profileUser) {
  //   renderUserData(profileUser);
  // });
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
  commentCreatorSpan.innerHTML = paperJSON.fileName;
  commentCreatorSpan.setAttribute("href", "/api/paper/" + paperJSON.fileName);

  commentDiv.appendChild(commentCreatorSpan);

  commentContentSpan = document.createElement("span");
  commentContentSpan.className = "comment-content";
  commentContentSpan.innerHTML = " Abstract" + "-" + paperJSON.title;
  commentDiv.appendChild(commentContentSpan);

  return commentDiv;
}

function renderPaper(papers, user) {
  const storiesDiv = document.getElementById("papers");
  //get("/api/user_papers", {}, function(papers) {
  console.log(papers);

  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }

  document.getElementById("new-paper").appendChild(newPaperDOMObject());
}

function renderCommentPaper(papers, user) {
  const storiesDiv = document.getElementById("commentpapers");
  //get("/api/user_papers", {}, function(papers) {
  console.log(papers);

  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }
  //});
  // document.getElementById("new-paper").appendChild(newPaperDOMObject());
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

// // function paperDOMObject(paperJSON) {
// //   commentDiv = document.createElement("div");
// //   commentDiv.setAttribute("id", paperJSON._id);
// //   commentDiv.className = "comment mb-2";

// //   commentCreatorSpan = document.createElement("a");
// //   commentCreatorSpan.className = "comment-creator";
// //   commentCreatorSpan.innerHTML = paperJSON.filename;
// //   // commentCreatorSpan.setAttribute("href", "/pdf/" + paperJSON.filename);
// //   commentCreatorSpan.setAttribute("href", "/paper");

// //   commentDiv.appendChild(commentCreatorSpan);

// //   commentContentSpan = document.createElement("span");
// //   commentContentSpan.className = "comment-content";
// //   commentContentSpan.innerHTML = " | " + paperJSON.abstract;
// //   commentDiv.appendChild(commentContentSpan);

// //   return commentDiv;
// // }

// function paperDOMObject(storyJSON, user) {
//   const card = document.createElement("div");
//   card.setAttribute("id", storyJSON._id);
//   card.className = "story card";

//   const cardBody = document.createElement("div");
//   cardBody.className = "card-body";
//   card.appendChild(cardBody);

//   const creatorSpan = document.createElement("a");
//   creatorSpan.className = "story-creator card-title";
//   creatorSpan.innerHTML = storyJSON.author;
//   // creatorSpan.setAttribute("href", "/u/profile?" + storyJSON.creator_id);
//   cardBody.appendChild(creatorSpan);

//   const contentSpan = document.createElement("p");
//   contentSpan.className = "story-content card-text";
//   contentSpan.innerHTML = storyJSON.abstract;
//   cardBody.appendChild(contentSpan);

//   const cardFooter = document.createElement("div");
//   cardFooter.className = "card-footer";
//   card.appendChild(cardFooter);

//   // const commentsDiv = document.createElement("div");
//   // commentsDiv.setAttribute("id", storyJSON._id + "-comments");
//   // commentsDiv.className = "story-comments";
//   // cardFooter.appendChild(commentsDiv);

//   if (user._id !== undefined)
//     cardFooter.appendChild(newCommentDOMObject(storyJSON._id));

//   return card;
// }

// function newCommentDOMObject(parent) {
//   const newCommentDiv = document.createElement("div");
//   newCommentDiv.className = "comment input-group";

//   const newCommentContent = document.createElement("input");
//   newCommentContent.setAttribute("type", "text");
//   newCommentContent.setAttribute("name", "content");
//   newCommentContent.setAttribute("placeholder", "New Comment");
//   newCommentContent.setAttribute("id", parent + "-comment-input");
//   newCommentContent.className = "form-control";
//   newCommentDiv.appendChild(newCommentContent);

//   const newCommentParent = document.createElement("input");
//   newCommentParent.setAttribute("type", "hidden");
//   newCommentParent.setAttribute("name", "parent");
//   newCommentParent.setAttribute("value", parent);
//   newCommentDiv.appendChild(newCommentParent);

//   const newCommentButtonDiv = document.createElement("div");
//   newCommentButtonDiv.className = "input-group-append";
//   newCommentDiv.appendChild(newCommentButtonDiv);

//   return newCommentDiv;
// }

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

  // const myPaper = document.getElementById("mypapers");
  // get("/api/mypaper", { parent: "5c38f4241e4d643add432fbd" }, function(
  //   papersArr
  // ) {
  //   for (let j = 0; j < papersArr.length; j++) {
  //     const currentPaper = papersArr[j];
  //     myPaper.appendChild(paperDOMObject(currentPaper));
  //   }
  //   console.log(myPaper);
  //   // console.log(papersArr);
  //   // console.log(papersArr);
  // });

  // const storiesDiv = document.getElementById("stories");
  // get("/api/allpaper", {}, function(storiesArr) {
  //   console.log("papers");
  //   for (let i = 0; i < storiesArr.length; i++) {
  //     const currentStory = storiesArr[i];
  //     storiesDiv.prepend(paperDOMObject(currentStory, user));
  //   }
  // });
  // document.getElementById("new-paper").appendChild(newPaperDOMObject());
}

// main();
