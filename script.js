const apiKey = '6AkNuPN7aGYwYSrzlli6b7RbCXAhMiAu'; 
let apiUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

// Función para cargar y mostrar los artículos
function loadArticles(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const articlesContainer = document.getElementById('articles');
      articlesContainer.innerHTML = ''; // Limpiar el contenedor de artículos

      data.results.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('card', 'mb-3');
        
        // Obtener la URL de la imagen de vista previa
        const imageUrl = article.multimedia.length > 0 ? article.multimedia[0].url : 'placeholder_image_url.jpg';
        
        articleDiv.innerHTML = `
          <img src="${imageUrl}" class="card-img-top" alt="Article Image">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.abstract}</p>
            <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
          </div>
        `;
        articlesContainer.appendChild(articleDiv);
      });
    })
    .catch(error => console.error('Error fetching articles:', error));
}

// Cargar artículos al cargar la página
window.addEventListener('load', () => {
  loadArticles(apiUrl); // Cargar artículos al inicio

  // Escuchar el evento de enviar el formulario de búsqueda
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', event => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim();

    // Verificar si se ingresó un término de búsqueda
    if (searchTerm !== '') {
      // Actualizar la URL de la API con el término de búsqueda
      apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${apiKey}`;
      
      // Cargar artículos con la nueva URL
      loadArticles(apiUrl);
    }
  });
});
