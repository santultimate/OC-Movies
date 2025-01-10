const apiBaseUrl = "http://localhost:8000/api/v1";

// Fonction pour récupérer des données depuis l`API
async function fetchMovies(url) {
    const response = await fetch(url);
    if (!response.ok) {
        console.error("Erreur API :", response.status);
        return null;
    }
    return response.json();
}

// Fonction pour afficher le meilleur film
async function displayBestMovie() {
    try {
        // Appel de l'API pour récupérer les données
        const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
        const data = await response.json();

        // Vérification si des résultats existent
        if (data.results && data.results.length > 0) {
            const bestMovie = data.results[0]; // Premier film de la liste (le mieux noté)

            // Insérer les informations du film dans le conteneur
            const container = document.getElementById("best-movie-container");
            container.innerHTML = `
                <img src="${bestMovie.image_url}" alt="Affiche de ${bestMovie.title}" class="movie-poster">
                <div class="movie-details">
                    <h3>${bestMovie.title}</h3>
                    <p><strong>Année :</strong> ${bestMovie.year}</p>
                    <p><strong>Réalisateur :</strong> ${bestMovie.directors.join(", ")}</p>
                    <p><strong>Genre :</strong> ${bestMovie.genres.join(", ")}</p>
                    <p><strong>Note IMDb :</strong> ${bestMovie.imdb_score}</p>
                    <p>${bestMovie.description || "Aucune description disponible."}</p>
                    <button onclick="showMovieDetails(${bestMovie.id})">Voir les détails</button>
                </div>
            `;
        } else {
            console.error("Aucun film trouvé.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Appel automatique de la fonction lorsque le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
    displayBestMovie();
});

// Fonction pour afficher les détails d'un film (à implémenter si nécessaire)
function showMovieDetails(movieId) {
    alert(`Afficher les détails pour le film avec l'ID : ${movieId}`);
}


// Fonction appelée à l'initialisation de l'application
function initializeApp() {
    // Appeler la fonction pour afficher le meilleur film
    displayBestMovie();

    // Ajouter d'autres appels si nécessaire, par exemple pour les catégories ou les films les mieux notés
    displayTopRatedMovies();
    loadCategoryMovies("Mystery");
}
s

// Charger les films par catégorie
async function loadCategoryMovies(category, containerId, page = 1) {
    const url = `${apiBaseUrl}/titles/?genre_contains=${category}&page=${page}`;
    const data = await fetchMovies(url);
    if (data && data.results.length > 0) {
        const container = document.querySelector(`#${containerId} .movies-container`);
        data.results.forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.className = "movie";
            movieElement.innerHTML = `
                <img src="${movie.image_url}" alt="${movie.title}">
                <p>${movie.title}</p>
                <button onclick="showMovieDetails(${movie.id})">Détails</button>
            `;
            container.appendChild(movieElement);
        });
    }
}

// Afficher les détails d`un film dans une fenêtre modale
async function showMovieDetails(movieId) {
    const data = await fetchMovies(`${apiBaseUrl}/titles/${movieId}`);
    if (data) {
        const modalDetails = document.getElementById("modal-details");
        modalDetails.innerHTML = `
            <h3>${data.title}</h3>
            <p><strong>Année :</strong> ${data.year}</p>
            <p><strong>Score IMDB :</strong> ${data.imdb_score}</p>
            <p>${data.description}</p>
            <img src="${data.image_url}" alt="${data.title}">
        `;
        document.getElementById("modal").classList.remove("hidden");
    }
}

// Fermer la fenêtre modale
document.getElementById("modal-close").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
});

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    displayBestMovie();
    loadCategoryMovies("Mystery", "category-mystery");

    // Ajouter un événement pour charger plus de films dans chaque catégorie
    document.querySelectorAll(".load-more").forEach(button => {
        button.addEventListener("click", (event) => {
            const category = event.target.dataset.category;
            const containerId = event.target.closest(".category").id;
            loadCategoryMovies(category, containerId, 2); // Charger la page 2
        });
    });
});