const quotesBtn = document.querySelector(".btns");
const qoutes = document.querySelector(".quotes");
const authorName = document.querySelector(".author");
const copyBtn = document.getElementById("copy");
const speaks = document.querySelector("#speak");
const tweet = document.querySelector(".tweet");

function quotesFunction() {
  quotesBtn.classList.add("load");
  quotesBtn.textContent = "Please Wait....";
  // console.log("You have Clicked on the button")
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      qoutes.innerHTML = `&ldquo;${result.content}&rdquo;`;
      authorName.innerHTML = `&mdash; ${result.author}`;
      console.log(result);
      quotesBtn.textContent = "Next Quote";
      quotesBtn.classList.remove("load");
    })
    .catch((err) => console.log(`Something Wents Wrong: ${err.message}`));
}

quotesBtn.addEventListener("click", quotesFunction);

copyBtn.addEventListener("click", (e) => {
  navigator.clipboard.writeText(qoutes.innerHTML.trim());
});

speaks.addEventListener("click", (e) => {
  const utterance = new SpeechSynthesisUtterance(
    `${qoutes.innerHTML}, by ${authorName.innerHTML}`
  );
  speechSynthesis.speak(utterance);
});
tweet.addEventListener("click", (e) => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${qoutes.innerHTML}`;
  window.open(tweetUrl, `_blank`);
});
