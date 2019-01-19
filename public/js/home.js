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

  get("/api/toppaper", {}, function(papers) {
    renderTopPaper(papers);
  });

  get("/api/allpaper", {}, function(papers) {
    renderPaper(papers);
  });

  get("/api/cate/physics", {}, function(papers) {
    renderPhysicsPaper(papers);
  });

  get("/api/cate/chemistry", {}, function(papers) {
    renderChemistryPaper(papers);
  });

  get("/api/cate/math", {}, function(papers) {
    renderMathPaper(papers);
  });

  get("/api/cate/econ", {}, function(papers) {
    renderEconPaper(papers);
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
  // commentCreatorSpan.setAttribute("href", "/api/paper/" + paperJSON._id);

  //   commentCreatorSpan.setAttribute("href", "/paper");

  commentDiv.appendChild(commentCreatorSpan);

  commentContentSpan = document.createElement("span");
  commentContentSpan.className = "comment-content";
  commentContentSpan.innerHTML = " | " + paperJSON.author;
  commentDiv.appendChild(commentContentSpan);

  return commentDiv;
}

function renderPaper(papers) {
  const storiesDiv = document.getElementById("papers");
  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }
}

function renderPhysicsPaper(papers) {
  const storiesDiv = document.getElementById("physics-card");
  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }
}

function renderChemistryPaper(papers) {
  const storiesDiv = document.getElementById("chemistry-card");
  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }
}

function renderMathPaper(papers) {
  const storiesDiv = document.getElementById("math-card");
  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }
}

function renderEconPaper(papers) {
  const storiesDiv = document.getElementById("econ-card");
  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }
}

function renderTopPaper(papers) {
  const storiesDiv = document.getElementById("popular-paper-card");
  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }
}

main();
