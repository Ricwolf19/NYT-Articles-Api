const apiKey = config.apiKey;

const apiUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

// Función para cargar y mostrar los artículos
function loadArticles() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const articlesContainer = document.getElementById('articles');
      articlesContainer.innerHTML = ''; // Limpiar el contenedor de artículos

      data.results.forEach(article => {
        createArticleCard(article, articlesContainer);
      });

      // Obtener la barra de búsqueda
      const searchBar = document.getElementById('searchBar');
      searchBar.addEventListener('input', function() {
        const searchValue = searchBar.value.toLowerCase();
        articlesContainer.innerHTML = ''; // Limpiar el contenedor de artículos antes de filtrar

        data.results.forEach(article => {
          if (article.title.toLowerCase().includes(searchValue) || article.abstract.toLowerCase().includes(searchValue)) {
            createArticleCard(article, articlesContainer);
          }
        });
      });
    })
    .catch(error => console.error('Error fetching articles:', error));
}

// Función para crear una tarjeta de artículo
function createArticleCard(article, container) {
  const articleDiv = document.createElement('div');
  articleDiv.classList.add('card', 'mb-3');

  const imageUrl = article.multimedia.length > 0 ? article.multimedia[0].url : 'placeholder_image_url.jpg';

  articleDiv.innerHTML = `
    <img src="${imageUrl}" class="card-img-top" alt="Article Image">
    <div class="card-body">
      <h5 class="card-title">${article.title}</h5>
      <p class="card-text">${article.abstract}</p>
      <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
    </div>
  `;
  container.appendChild(articleDiv);
}

// Cargar artículos al cargar la página
window.addEventListener('load', loadArticles);


