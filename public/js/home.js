function main() {
  //   const profileId = window.location.search.substring(1);
  // get("/api/user", { id: profileId }, function(profileUser) {
  //   renderUserData(profileUser);
  // });
  // const user = {
  //   _id: 'anonid',
  //   name: 'Anonymous',
  //   last_post: 'Anon was here',
  // };
  get("/api/allpaper", {}, function(papers) {
    renderPaper(papers);
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
  commentCreatorSpan.innerHTML = paperJSON.filepath;
  commentCreatorSpan.setAttribute("href", "/paper/" + paperJSON._id);
  //   commentCreatorSpan.setAttribute("href", "/paper");

  commentDiv.appendChild(commentCreatorSpan);

  commentContentSpan = document.createElement("span");
  commentContentSpan.className = "comment-content";
  commentContentSpan.innerHTML = " | " + paperJSON.abstract;
  commentDiv.appendChild(commentContentSpan);

  return commentDiv;
}

function renderPaper(papers) {
  const storiesDiv = document.getElementById("papers");
  get("/api/allpaper", {}, function(papers) {
    for (let i = 0; i < papers.length; i++) {
      const currentStory = papers[i];
      storiesDiv.prepend(paperDOMObject(currentStory));
    }
  });
}

main();
