// Variables globales
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("close-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalGenre = document.getElementById("modal-genre");
const modalReleaseDate = document.getElementById("modal-release-date");
const modalRating = document.getElementById("modal-rating");
const modalDirector = document.getElementById("modal-director");
const modalActors = document.getElementById("modal-actors");
const modalDuration = document.getElementById("modal-duration");
const modalCountry = document.getElementById("modal-country");
const modalBoxOffice = document.getElementById("modal-box-office");
const modalSummary = document.getElementById("modal-summary");

const apiBaseUrl = "http://localhost:8000/api/v1/titles/";
// Fermer la modale
closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  
// Ouvrir la modale avec les données du film

function openModal(movie) {
    modalImg.src = movie.image_url || "#";
    modalTitle.textContent = movie.title || "Titre indisponible";
    modalGenre.textContent = `Genre : ${movie.genres || "Non spécifié"}`;
    modalReleaseDate.textContent = `Date de sortie : ${movie.release_date || "Non spécifiée"}`;
    modalRating.textContent = `Classification : ${movie.rated || "Non classé"}`;
    modalDirector.textContent = `Réalisateur : ${movie.directors || "Inconnu"}`;
    modalActors.textContent = `Acteurs : ${movie.actors || "Non spécifiés"}`;
    modalDuration.textContent = `Durée : ${movie.duration || "Non spécifiée"} min`;
    modalCountry.textContent = `Pays d'origine : ${movie.countries || "Non spécifié"}`;
    modalBoxOffice.textContent = `Recettes au box-office : ${movie.box_office || "Non spécifiées"}`;
    modalSummary.textContent = movie.description || "Résumé non disponible";
  
    modal.classList.remove("hidden");
  }
  
// Fonction pour récupérer des données depuis l'API
async function fetchMovies(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Erreur API :", response.status);
            return null;
        }
        return response.json();
    } catch (error) {
        console.error("Erreur lors de la requête API :", error);
        return null;
    }
}
// Fonction pour afficher le meilleur film
// async function displayBestMovie() {
//    const response = await fetchMovies(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`);
//    const data = await response.json();
//    if (data && data.results.length > 0) {
//        const bestMovie = data.results[0];
//        const container = document.getElementById('best-movie-container');
//        container.innerHTML = `
//            <img src="${bestMovie.image_url}" alt="${bestMovie.title}" class="movie-poster">
//            <div class="movie-details">
//                <h3>${bestMovie.title}</h3>
//                <p><strong>Année :</strong> ${bestMovie.year}</p>
//                <p><strong>Réalisateur :</strong> ${bestMovie.directors.join(', ')}</p>
//                <p><strong>Genre :</strong> ${bestMovie.genres.join(', ')}</p>
//                <p><strong>Note IMDb :</strong> ${bestMovie.imdb_score}</p>
//                <p>${bestMovie.description}</p>
//                <button onclick="showMovieDetails(${bestMovie.id})">Voir les détails</button>
//            </div>
//        `;
//    }
// }

// Récupérer et afficher le meilleur film
async function displayBestMovie() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const bestMovie = data.results[0];
            
            // Mise à jour du conteneur image
            const bestMovieImage = document.querySelector(".best-movie-image img");
            bestMovieImage.src = bestMovie.image_url;
            bestMovieImage.alt = `Affiche de ${bestMovie.title}`;
            
            // Mise à jour des détails
            const bestMovieDetails = document.querySelector(".best-movie-details");
            bestMovieDetails.innerHTML = `
                <h3>${bestMovie.title}</h3>
                <p><strong>Genre :</strong> ${bestMovie.genres.join(", ")}</p>
                <p><strong>Date de sortie :</strong> ${bestMovie.date_published}</p>
                <p><strong>Note IMDb :</strong> ${bestMovie.imdb_score}</p>
                <p><strong>Résumé :</strong> ${bestMovie.description || "Aucune description disponible."}</p>
                <button onclick="showMovieDetails(${bestMovie.id})">Voir les détails</button>
            `;
        } else {
            console.error("Aucun film trouvé pour la section 'Meilleur film'.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Fonction pour afficher les détails du film dans une modale
function showMovieDetails(movieId) {
    // Ajouter ici le code pour ouvrir une modale et afficher les détails du film
    console.log(`Affichage des détails pour le film ID : ${movieId}`);
}

function showMovieDetails(filmId) {
    // Exemple d'appel d'API pour obtenir les détails du film
    fetch(`http://localhost:8000/api/v1/titles/${filmId}/`)
        .then((response) => response.json())
        .then((data) => {
            console.log("Détails du film :", data);
            // Affichez les détails dans une modale ou une section dédiée
            alert(`Titre : ${data.title}\nRéalisateur : ${data.directors}\nAnnée : ${data.year}`);
        })
        .catch((error) => console.error("Erreur :", error));
}

// Récupérer et afficher les 6 meilleurs films de la catégorie Mystère
async function displayMysteryMovies() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/?genre=Mystery&sort_by=-imdb_score&page_size=6");
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const container = document.getElementById("mystery-movies-container");

            container.innerHTML = data.results
                .map(
                    (movie) => `
                    <div class="movie-item">
                        <img src="${movie.image_url}" alt="Affiche de ${movie.title}" class="movie-poster">
                        <h4>${movie.title}</h4>
                        <button onclick="showMovieDetails(${movie.id})">Détail</button>
                    </div>
                `
                )
                .join("");
        } else {
            console.error("Aucun film trouvé pour la catégorie 'Mystère'.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des films de la catégorie Mystère :", error);
    }
}
// Récupérer et afficher les 6 meilleurs films d'une catégorie spécifique
async function displayMoviesByCategory(category, containerId) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/titles/?genre=${category}&sort_by=-imdb_score&page_size=6`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const container = document.getElementById(containerId);

            container.innerHTML = data.results
                .map(
                    (movie) => `
                    <div class="movie-item">
                        <img src="${movie.image_url}" alt="Affiche de ${movie.title}" class="movie-poster">
                        <h4>${movie.title}</h4>
                        <button onclick="showMovieDetails(${movie.id})">Détail</button>
                    </div>
                `
                )
                .join("");
        } else {
            console.error(`Aucun film trouvé pour la catégorie '${category}'.`);
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des films de la catégorie '${category}' :`, error);
    }
}

// Afficher les détails d'un film dans la modale
async function showMovieDetails(movieId) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/titles/${movieId}`);
        const movie = await response.json();

        document.getElementById("modal-img").src = movie.image_url;
        document.getElementById("modal-title").textContent = movie.title;
        document.getElementById("modal-genre").textContent = `Genre : ${movie.genres.join(", ")}`;
        document.getElementById("modal-release-date").textContent = `Date de sortie : ${movie.date_published}`;
        document.getElementById("modal-rating").textContent = `Classification : ${movie.rated}`;
        document.getElementById("modal-director").textContent = `Réalisateur : ${movie.directors.join(", ")}`;
        document.getElementById("modal-actors").textContent = `Acteurs : ${movie.actors.join(", ")}`;
        document.getElementById("modal-duration").textContent = `Durée : ${movie.duration} min`;
        document.getElementById("modal-country").textContent = `Pays d'origine : ${movie.countries.join(", ")}`;
        document.getElementById("modal-box-office").textContent = `Recettes au box-office : ${movie.worldwide_gross_income || "Non disponible"}`;
        document.getElementById("modal-summary").textContent = movie.description;

        // Afficher la modale
        document.getElementById("modal").classList.remove("hidden");
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du film :", error);
    }
}

// Fermer la modale
document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
});

// Charger automatiquement les données lorsque la page est prête
document.addEventListener("DOMContentLoaded", () => {
    displayBestMovie();
    displayMysteryMovies();
    displayMoviesByCategory("Mystery", "mystery-movies-container");
    displayMoviesByCategory("Fantasy", "fantasy-movies-container");
    displayMoviesByCategory("Drama", "drama-movies-container");    
});

// Charger les films pour une catégorie donnée
async function loadMovies(category, containerId) {
    try {
      const response = await fetch(`${API_BASE_URL}?category=${category}`);
      const data = await response.json();
      const container = document.getElementById(containerId);
      container.innerHTML = ""; // Vider le conteneur avant d'ajouter les films
  
      data.results.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
  
        const movieImg = document.createElement("img");
        movieImg.src = movie.image_url || "#";
        movieImg.alt = movie.title || "Affiche du film";
  
        movieItem.appendChild(movieImg);
  
        // Ajouter un événement "click" pour ouvrir la modale
        movieItem.addEventListener("click", () => openModal(movie));
  
        container.appendChild(movieItem);
      });
    } catch (error) {
      console.error(`Erreur lors du chargement des films pour la catégorie ${category}:`, error);
    }
  }
  
  // Charger les meilleurs films
  async function loadBestMovie() {
    try {
      const response = await fetch(`${API_BASE_URL}?sort_by=rating&limit=1`);
      const data = await response.json();
      const bestMovie = data.results[0]; // Supposons que le premier film est le meilleur
  
      const bestMovieContainer = document.getElementById("movie-display");
      bestMovieContainer.innerHTML = `
        <img src="${bestMovie.image_url}" alt="Affiche de ${bestMovie.title}">
        <h3>${bestMovie.title}</h3>
        <p>${bestMovie.description || "Résumé non disponible"}</p>
        <button id="best-movie-details-btn">Voir plus de détails</button>
      `;
  
      // Ajouter un événement pour ouvrir la modale avec le meilleur film
      document.getElementById("best-movie-details-btn").addEventListener("click", () => openModal(bestMovie));
    } catch (error) {
      console.error("Erreur lors du chargement du meilleur film:", error);
    }
  }
  
  // Afficher les films pour la catégorie sélectionnée (autres catégories)
  function displayCategoryMovies(category, containerId) {
    loadMovies(category, containerId);
  }
  
  // Charger toutes les catégories au démarrage
  function loadAllCategories() {
    loadBestMovie();
    loadMovies("mystery", "mystery-movies-container");
    loadMovies("fantasy", "fantasy-movies-container");
    loadMovies("drama", "drama-movies-container");
  }
  
  // Initialisation au chargement de la page
  document.addEventListener("DOMContentLoaded", () => {
    loadAllCategories();
  });
