async function loadRoutes() {
    try {
        const response = await fetch('routes.json');
        const routes = await response.json();
        const routesContainer = document.getElementById('routes');

        routesContainer.innerHTML = '';

        routes.forEach(route => {
            const routeBlock = document.createElement('div');
            routeBlock.classList.add('route-block');

            routeBlock.innerHTML = `
                <div class="route-left">
                    <div class="route-title">${route.name}</div>
                    <div class="route-line"></div>
                    <div class="route-difficulty" onclick="openModal()">trudność trasy: ${route.difficulty}/10</div>
                    <div class="route-distance">Odległość: ${route.distance} km</div>
                    <p class="route-description">${route.description}</p>
                    <div class="button-container">
                        <a href="${route.file_url}" download class="btn-gallery">Pobierz GPX</a>
                    </div>
                </div>
                <div class="route-right">
                    <div class="strava-container">
                        ${route.iframe_code}
                    </div>
                    <div class="button-container right-button">
                        <a href="${route.right_button_url}" target="_blank" class="btn-gallery">Zobaczyć szczegóły</a>
                    </div>
                </div>
            `;

            routesContainer.appendChild(routeBlock);
        });

        // Перезавантажуємо Strava Embeds після додавання нових маршрутів
        reloadStravaEmbeds();
    } catch (error) {
        console.error('Помилка завантаження маршрутів:', error);
    }
}

loadRoutes();

// фіксимо проблему з тим що пропадають кнопки для блоку страви
function reloadStravaEmbeds() {
  if (window.StravaEmbs) {
      window.StravaEmbs.load(); // Перезапускаємо Strava-ембеди без видалення скрипта
  } else {
      let newScript = document.createElement('script');
      newScript.src = "https://strava-embeds.com/embed.js";
      newScript.async = true;
      newScript.onload = function () {
          if (window.StravaEmbs) {
              window.StravaEmbs.load();
          }
      };
      document.body.appendChild(newScript);
  }
}

// Функція відкриття модального вікна
function openModal() {
    document.getElementById("difficultyModal").style.display = "flex";
}

// Функція закриття модального вікна
function closeModal() {
    document.getElementById("difficultyModal").style.display = "none";
}

// Закриття вікна при натисканні поза його межами
window.onclick = function(event) {
    let modal = document.getElementById("difficultyModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

loadRoutes();