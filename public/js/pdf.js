function main() {
  // __dirname + "../pdf/100solutions.pdf-1547920220413.pdf";
  const pdfSpace = document.getElementById("me");
  let makeIframe = document.createElement("iframe");
  makeIframe.setAttribute("src", "http://aol.com");
  makeIframe.setAttribute("scrolling", "no");
  makeIframe.style.border = "none";
  makeIframe.style.left = "-453px";
  makeIframe.style.top = "-70px";
  makeIframe.style.position = "absolute";
  makeIframe.style.width = "1440px";
  makeIframe.style.height = "775px";
  pdfSpace.appendChild(makeIframe);
  let makediv = document.createElement("div");
  makediv.style.height = "43px";
  makediv.style.width = "564px";
  makediv.style.position = "relative";
  makediv.style.overflow = "hidden";
}

main();
