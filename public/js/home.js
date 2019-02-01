function main() {
  // get("/api/toppaper", {}, function(papers) {
  //   renderTopPaper(papers);
  // });

  // get("/api/allpaper", {}, function(papers) {
  //   renderPaper(papers);
  // });

  get("/api/cate/physics", {}, function(papers) {
    renderPhysicsPaper(papers);
  });

  get("/api/cate/chemistry", {}, function(papers) {
    renderChemistryPaper(papers);
  });

  get("/api/cate/econ", {}, function(papers) {
    renderEconPaper(papers);
  });

  get("/api/cate/biology", {}, function(papers) {
    renderBioPaper(papers);
  });

  get("/api/cate/other", {}, function(papers) {
    renderOtherPaper(papers);
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

  commentContentSpan = document.createElement("span");
  commentContentSpan.className = "comment-content";
  const d = new Date(paperJSON.date);
  commentContentSpan.innerHTML = " | submitted at " + d.toLocaleDateString();
  commentDiv.appendChild(commentContentSpan);

  return commentDiv;
}

// function renderPaper(papers) {
//   const storiesDiv = document.getElementById("newest-papers");
//   for (let i = 0; i < papers.length; i++) {
//     const currentStory = papers[i];
//     storiesDiv.prepend(paperDOMObject(currentStory));
//   }
//   document.getElementById("new-paper").appendChild(newPaperDOMObject());
// }

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

// function renderMathPaper(papers) {
//   const storiesDiv = document.getElementById("math-card");
//   for (let i = 0; i < papers.length; i++) {
//     const currentStory = papers[i];
//     storiesDiv.prepend(paperDOMObject(currentStory));
//   }
// }

function renderEconPaper(papers) {
  const storiesDiv = document.getElementById("econ-card");
  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }
}

function renderBioPaper(papers) {
  const storiesDiv = document.getElementById("biology-card");
  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }
}

// function renderEECSPaper(papers) {
//   const storiesDiv = document.getElementById("eecs-card");
//   for (let i = 0; i < papers.length; i++) {
//     const currentStory = papers[i];
//     storiesDiv.prepend(paperDOMObject(currentStory));
//   }
// }

// function renderSocialPaper(papers) {
//   const storiesDiv = document.getElementById("social-card");
//   for (let i = 0; i < papers.length; i++) {
//     const currentStory = papers[i];
//     storiesDiv.prepend(paperDOMObject(currentStory));
//   }
// }

// function renderAstronomyPaper(papers) {
//   const storiesDiv = document.getElementById("astronomy-card");
//   for (let i = 0; i < papers.length; i++) {
//     const currentStory = papers[i];
//     storiesDiv.prepend(paperDOMObject(currentStory));
//   }
// }

// function renderBusinessPaper(papers) {
//   const storiesDiv = document.getElementById("business-card");
//   for (let i = 0; i < papers.length; i++) {
//     const currentStory = papers[i];
//     storiesDiv.prepend(paperDOMObject(currentStory));
//   }
// }

// function renderEnergyPaper(papers) {
//   const storiesDiv = document.getElementById("energy-card");
//   for (let i = 0; i < papers.length; i++) {
//     const currentStory = papers[i];
//     storiesDiv.prepend(paperDOMObject(currentStory));
//   }
// }

// function renderArtPaper(papers) {
//   const storiesDiv = document.getElementById("art-card");
//   for (let i = 0; i < papers.length; i++) {
//     const currentStory = papers[i];
//     storiesDiv.prepend(paperDOMObject(currentStory));
//   }
// }

function renderOtherPaper(papers) {
  const storiesDiv = document.getElementById("other-card");
  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }
}

// function renderTopPaper(papers) {
//   const storiesDiv = document.getElementById("popular-paper-card");
//   for (let i = 0; i < papers.length; i++) {
//     const currentStory = papers[i];
//     storiesDiv.prepend(paperDOMObject(currentStory));
//   }
// }

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

  return newStoryDiv;
}

main();
