function main() {
  const profileId = window.location.search.substring(1);
  get(
    "/api/user",
    {
      user_id: profileId
    },
    function(user, err) {
      renderUserData(user);
    }
  );

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
  PaperDiv = document.createElement("div");

  titleLink = document.createElement("a");
  titleLink.setAttribute("href", "/api/paper/" + paperJSON.fileName);

  titleSpan = document.createElement("h3");
  titleSpan.innerHTML = paperJSON.title;
  titleLink.appendChild(titleSpan);
  PaperDiv.appendChild(titleLink);

  viewSpan = document.createElement("span");
  viewSpan.innerHTML = `      ${paperJSON.views} viewed  | `;
  PaperDiv.appendChild(viewSpan);

  downloadSpan = document.createElement("span");
  downloadSpan.innerHTML = `${paperJSON.downloads} downloaded`;
  PaperDiv.appendChild(downloadSpan);

  versionBtn = document.createElement("button");
  versionBtn.innerHTML = "Update Version";
  versionBtn.className = "btn btn-light";
  versionBtn.addEventListener("click", () => {
    window.location = "/api/upload_version_form/" + paperJSON.fileName;
  });
  PaperDiv.appendChild(versionBtn);

  return PaperDiv;
}

function commentDOMObject(paperJSON) {
  PaperDiv = document.createElement("div");

  titleLink = document.createElement("a");
  titleLink.setAttribute("href", "/api/paper/" + paperJSON.fileName);

  titleSpan = document.createElement("h3");
  titleSpan.innerHTML = paperJSON.title;
  titleLink.appendChild(titleSpan);
  PaperDiv.appendChild(titleLink);

  viewSpan = document.createElement("span");
  viewSpan.innerHTML = `      ${paperJSON.views} viewed  | `;
  PaperDiv.appendChild(viewSpan);

  downloadSpan = document.createElement("span");
  downloadSpan.innerHTML = `${paperJSON.downloads} downloaded`;
  PaperDiv.appendChild(downloadSpan);

  versionBtn = document.createElement("button");
  versionBtn.innerHTML = "More Comment";
  versionBtn.className = "btn btn-light";
  versionBtn.addEventListener("click", () => {
    window.location = "/api/upload_comment_form/" + paperJSON.fileName;
  });
  PaperDiv.appendChild(versionBtn);

  return PaperDiv;
}

function renderPaper(papers, user) {
  const storiesDiv = document.getElementById("papers");

  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(paperDOMObject(currentStory));
  }

  document.getElementById("new-paper").appendChild(newPaperDOMObject());
}

function renderCommentPaper(papers, user) {
  const storiesDiv = document.getElementById("commentpapers");

  for (let i = 0; i < papers.length; i++) {
    const currentStory = papers[i];
    storiesDiv.prepend(commentDOMObject(currentStory));
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
  newStorySubmit.className = "btn btn-info";
  newStorySubmit.addEventListener("click", () => {
    window.location = "/api/upload_paper_form";
  });

  newStoryButtonDiv.appendChild(newStorySubmit);

  return newStoryDiv;
}

function renderUserData(user) {
  // rendering name
  const nameContainer = document.getElementById("name-container");
  const nameHeader = document.createElement("h4");
  nameHeader.innerHTML = `Dashboard`;
  nameContainer.appendChild(nameHeader);
}
