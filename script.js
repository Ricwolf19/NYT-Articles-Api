
const apiKey = '6AkNuPN7aGYwYSrzlli6b7RbCXAhMiAu'; 
const apiUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

// Función para cargar y mostrar los artículos
function loadArticles() {
  fetch(apiUrl)
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
window.addEventListener('load', loadArticles);
