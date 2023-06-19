async function fetchArticles() {
    try {
      let response = await fetch("https://api.nytimes.com/svc/topstories/v2/world.json?api-key=e7hA4infH5PUgsfP8qH51Mf68TYavGqk");
      let data = await response.json();
      let articles = data.results.slice(0, 14);
      return articles;
    } catch (err) {
      console.error("Error: ", err);
      return [];
    }
  }

  function updateTVScreen(article) {
    document.getElementById("articleTitle").textContent = article.title;
    document.getElementById("articleAbstract").textContent = article.abstract;

    if (article.multimedia && article.multimedia.length > 0) {
      let imageUrl = article.multimedia[0].url;
      document.getElementById("articleImage").src = imageUrl;
    }

    if (article.url) {
      let existingReadMoreLink = document.querySelector(".read-more-link");
      if (existingReadMoreLink) {
        existingReadMoreLink.parentNode.removeChild(existingReadMoreLink);
      }

      let readMoreLink = document.createElement("a");
      readMoreLink.textContent = "Read More";
      readMoreLink.href = article.url;
      readMoreLink.target = "_blank";
      readMoreLink.classList.add("read-more-link");

      let tvScreen = document.getElementById("tvScreen");
      tvScreen.appendChild(readMoreLink);
    }
  }

  function rotateArticles(articles) {
    let currentIndex = 0;

    function switchArticle() {
      updateTVScreen(articles[currentIndex]);
      currentIndex = (currentIndex + 1) % articles.length;
    }

    switchArticle();

    setInterval(switchArticle, 5000);
  }

  fetchArticles()
    .then((articles) => {
      rotateArticles(articles);
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
