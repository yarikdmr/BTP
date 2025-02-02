// Завантаження статей
fetch("articles.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const randomArticles = getRandomArticles(data, 3); // Вибираємо 3 випадкові статті
    renderRandomArticles(randomArticles); // Відображаємо статті
  })
  .catch((error) => console.error("Помилка завантаження статей:", error));

// Функція для вибору випадкових статей
function getRandomArticles(articles, count) {
  const shuffled = [...articles].sort(() => 0.5 - Math.random()); // Перемішуємо масив
  return shuffled.slice(0, count); // Беремо перші `count` статей
}

// Функція для відображення випадкових статей
function renderRandomArticles(articles) {
  const container = document.getElementById("random-articles-container");
  if (!container) {
    console.error("Контейнер для статей не знайдено!");
    return;
  }
  container.innerHTML = ""; // Очищаємо контейнер
  articles.forEach((article) => {
    const block = createArticleBlock(
      article.image,
      article.title,
      article.subtitle,
      `article.html?id=${article.id}`,
      "Czytaj"
    );
    container.innerHTML += block;
  });
}

// Функція для створення HTML блоку статті
function createArticleBlock(image, title, subtitle, link, buttonText) {
  return `
    <div class="article-block_random">
      <div class="article-image">
        <img class='article-img' src="${image}" alt="${title}">
      </div>
      <div class="article-content">
        <h2>${title}</h2>
        <div class="line"></div>
        <p>${subtitle}</p>
        <a href="${link}" class="read-more">${buttonText}</a>
      </div>
    </div>
  `;
}
