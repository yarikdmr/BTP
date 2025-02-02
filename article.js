fetch("articles.json")
  .then((response) => response.json())
  .then((data) => {
    let url = new URL(window.location.href);
    let search_params = url.searchParams;
    let currentArticleId = parseInt(search_params.get("id")); // Отримання ID поточної статті
    const article = data.find((a) => a.id === currentArticleId); // Знаходимо статтю за ID

    if (article) {
      // --- 1) Заголовок (h1) ---
      document.getElementById("article-title").textContent = article.title;

      // --- 2) Контейнер для изображений и текста ---
      const articleContentEl = document.getElementById("article-content");

      // 2a) Обёртка под картинку с «красной тенью» (image-shadow-container)
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-shadow-container");
      
      const mainImage = document.createElement("img");
      mainImage.src = article.image;
      mainImage.alt = article.title;
      imageContainer.appendChild(mainImage);
      
      // Вставляем контейнер с картинкой в article-content
      articleContentEl.appendChild(imageContainer);

      // 2b) Подзаголовок (h3) вместо inline-стилей – используем класс или ID
      const subtitleElement = document.createElement("h3");
      subtitleElement.id = "article-subtitle";      // Чтобы применялись стили #article-subtitle
      subtitleElement.textContent = article.subtitle;
      articleContentEl.appendChild(subtitleElement);

      // 2c) Контент статьи (HTML строка)
      const contentElement = document.createElement("div");
      contentElement.innerHTML = article.content;
      articleContentEl.appendChild(contentElement);

      // --- 3) Рекомендационный блок ---
      renderRecommendationBlock(currentArticleId);

    } else {
      // Если статья не найдена
      document.body.innerHTML = "<p class='not-found'>Стаття в розробці.</p>";
      console.log("Стаття не знайдена");
    }
  })
  .catch((error) => console.error("Помилка завантаження статті:", error));

  



  function renderRecommendationBlock(currentArticleId) {
    fetch("articles.json")
      .then((res) => res.json())
      .then((articles) => {
        const filtered = articles.filter(a => a.id !== currentArticleId);
        if (!filtered.length) return console.warn("Немає доступних статей для рекомендацій.");
  
        const randIndex = Math.floor(Math.random() * filtered.length);
        const rec = filtered[randIndex];
  
        // Генерируем HTML
        const recommendationBlock = `
          <div class="recommendation-wrapper">
            <div class="recommendation-block">
              <div class="rec-image-container">
                <img src="${rec.image}" alt="${rec.title}">
              </div>
              <div class="rec-content">
                <h3>${rec.title}</h3>
                <hr class="rec-separator">
                <p>${rec.subtitle}</p>
                <a href="article.html?id=${rec.id}" class="czytacz-btn">czytacz</a>
              </div>
            </div>
          </div>
        `;
  
        document.getElementById("recommendation-container").innerHTML = recommendationBlock;
      })
      .catch((err) => console.error("Помилка завантаження статей:", err));
  }
  


