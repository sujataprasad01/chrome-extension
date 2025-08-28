console.log("✅ content.js injected on:", window.location.href);

function getArticleText(){
    const article=document.querySelector("article");
    if(article){
        return article.innerText;
    }
    const paragraphs=Array.from(document.querySelectorAll("p"));
    return paragraphs.map((p)=>p.innerText).join("\n");
}

chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
  console.log("📩 Message received in content.js:", req);

  if (req.type === "GET_ARTICLE_TEXT") {
    const text = getArticleText();
    console.log("📝 Extracted text:", text.slice(0, 100)); // first 100 chars
    sendResponse({ text });
  }

  return true; // important
});
