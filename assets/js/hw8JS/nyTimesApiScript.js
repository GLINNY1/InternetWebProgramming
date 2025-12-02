// Function to search the NY Times API
function searchNYTimes() {

  // Get the search query from the input field and trim whitespace
  const searchQuery = document.getElementById("searchInput").value.trim();
  // Get the result div
  const resultDiv = document.getElementById("result");
  // Get the results container
  const resultsContainer = document.getElementById("resultsContainer");

  // Clear the results container and result div
  resultsContainer.innerHTML = "";
  resultDiv.textContent = "";

  // If no search query, display an error message
  if (!searchQuery) {
    resultDiv.textContent = "Please enter a search query.";
    resultDiv.className = "result error";
    return;
  }

  // Display a loading message
  resultDiv.textContent = "Searching...";
  resultDiv.className = "result loading";

  // Construct the API URL
  const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(searchQuery)}&api-key=${encodeURIComponent(API_KEY)}`;

  // Fetch the data from the API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      resultDiv.textContent = "";
      resultDiv.className = "result";

      if (data.response && data.response.docs && data.response.docs.length > 0) {
        const articles = data.response.docs;
        resultDiv.textContent = `Found ${articles.length} article(s)`;
        resultDiv.style.color = "#10b981";

        articles.forEach(article => {
          const articleDiv = document.createElement("div");
          articleDiv.className = "article";

          const title = document.createElement("div");
          title.className = "article-title";
          if (article.web_url) {
            const titleLink = document.createElement("a");
            titleLink.href = article.web_url;
            titleLink.target = "_blank";
            titleLink.textContent = article.headline?.main || article.headline?.print_headline || "No title";
            title.appendChild(titleLink);
          } else {
            title.textContent = article.headline?.main || article.headline?.print_headline || "No title";
          }
          articleDiv.appendChild(title);

          if (article.snippet) {
            const snippet = document.createElement("div");
            snippet.className = "article-snippet";
            snippet.textContent = article.snippet;
            articleDiv.appendChild(snippet);
          }

          const meta = document.createElement("div");
          meta.className = "article-meta";
          let metaText = "";
          if (article.byline?.original) {
            metaText += article.byline.original;
          }
          if (article.pub_date) {
            const pubDate = new Date(article.pub_date);
            if (metaText) metaText += " • ";
            metaText += pubDate.toLocaleDateString();
          }
          if (article.section_name) {
            if (metaText) metaText += " • ";
            metaText += `Section: ${article.section_name}`;
          }
          meta.textContent = metaText || "No additional information";
          articleDiv.appendChild(meta);

          resultsContainer.appendChild(articleDiv);
        });
      } else {
        resultDiv.textContent = "No articles found.";
        resultDiv.className = "result no-results";
      }
    })
    .catch(error => {
      resultDiv.textContent = `Error: ${error.message}. Please check your API key and try again.`;
      resultDiv.className = "result error";
      resultsContainer.innerHTML = "";
    });
}

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        searchNYTimes();
      }
    });
  }
});
