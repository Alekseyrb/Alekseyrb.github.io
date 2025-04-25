const ACCESS_KEY = "-AH0scNG-F9UyIZsvCMZ9KQ43xXk5PG_E6LVwYXXtr8";
const APP_NAME = "photo-explorer";

const gallery = document.getElementById("gallery");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category-btn");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");
const modalAuthorLink = document.getElementById("modal-author-link");

const API_URL = "https://api.unsplash.com";

async function fetchPhotos(query) {
  const url = `${API_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=12&client_id=${ACCESS_KEY}&utm_source=${APP_NAME}&utm_medium=referral`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    renderPhotos(data.results);
  } catch (error) {
    console.error("Помилка завантаження:", error);
  }
}

function renderPhotos(photos) {
  gallery.innerHTML = "";

  if (!photos.length) {
    gallery.innerHTML = "<p>Нічого не знайдено 😢</p>";
    return;
  }

  photos.forEach((photo) => {
    const img = document.createElement("img");
    img.src = photo.urls.small;
    img.alt = photo.alt_description || "Unsplash photo";
    img.loading = "lazy";
    img.title = `Фото від ${photo.user.name}`;

    img.addEventListener("click", () => openModal(photo));

    gallery.appendChild(img);
  });
}

function openModal(photo) {
  modal.classList.remove("hidden");
  modalImg.src = photo.urls.regular;
  modalAuthorLink.href = `${photo.user.links.html}?utm_source=${APP_NAME}&utm_medium=referral`;
  modalAuthorLink.textContent = photo.user.name;
}

modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
  modalImg.src = "";
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) fetchPhotos(query);
});

categoryButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    const query = btn.getAttribute("data-query");
    fetchPhotos(query);
  })
);

// Початковий запит
fetchPhotos("trending");
