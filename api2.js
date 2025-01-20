// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Configuration API
    const API_URL = 'http://localhost:8000/api/v1';
    const ITEMS_PER_CAROUSEL = 7;

    // Éléments du DOM
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const viewDetailsBtn = document.getElementById('view-details-btn');

    // Gestionnaires d'événements pour la modale
    closeModal.addEventListener('click', () => hideModal());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideModal();
    });

    // Fonctions pour la modale
    function showModal() {
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
    }

    function hideModal() {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
    }

    // Fonction pour charger les données d'un film
    async function fetchMovie(movieId) {
        try {
            const response = await fetch(`${API_URL}/titles/${movieId}`);
            return await response.json();
        } catch (error) {
            console.error('Erreur lors du chargement du film:', error);
            return null;
        }
    }

    // Fonction pour charger une liste de films
    async function fetchMovies(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Erreur lors du chargement des films:', error);
            return null;
        }
    }

    // Fonction pour mettre à jour la modale avec les données d'un film
    function updateModal(movie) {
        document.getElementById('modal-img').src = movie.image_url;
        document.getElementById('modal-title').textContent = movie.title;
        document.getElementById('modal-genre').textContent = `Genre : ${movie.genres.join(', ')}`;
        document.getElementById('modal-release-date').textContent = `Date de sortie : ${movie.year}`;
        document.getElementById('modal-rating').textContent = `Note : ${movie.rated}`;
        document.getElementById('modal-director').textContent = `Réalisateur : ${movie.directors.join(', ')}`;
        document.getElementById('modal-actors').textContent = `Acteurs : ${movie.actors.join(', ')}`;
        document.getElementById('modal-duration').textContent = `Durée : ${movie.duration} min`;
        document.getElementById('modal-country').textContent = `Pays : ${movie.countries.join(', ')}`;
        document.getElementById('modal-box-office').textContent = `Box-office : ${movie.worldwide_gross_income || 'Non disponible'}`;
        document.getElementById('modal-summary').textContent = `Résumé : ${movie.description}`;
    }

    // Fonction pour créer une carte de film
    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        const img = document.createElement('img');
        img.src = movie.image_url;
        img.alt = movie.title;
        
        card.appendChild(img);
        card.addEventListener('click', async () => {
            const fullMovie = await fetchMovie(movie.id);
            if (fullMovie) {
                updateModal(fullMovie);
                showModal();
            }
        });

        return card;
    }

    // Fonction pour initialiser un carrousel
    function initializeCarousel(containerId) {
        const container = document.getElementById(containerId);
        const section = container.closest('.movie-section');
        const prevButton = section.querySelector('.carousel-button.prev');
        const nextButton = section.querySelector('.carousel-button.next');

        prevButton.addEventListener('click', () => {
            container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
        });
    }

    //