/// Завантаження статей
let articles = [];

fetch("articles.json")
  .then((response) => response.json())
  .then((data) => {
    articles = data; // Зберігаємо статті для пошуку
    renderArticles(articles); // Відображаємо всі статті
    renderNewArticleBlock(); // Додаємо блок для створення нової статті
  })
  .catch((error) => console.error("Помилка завантаження статей:", error));

// Функція для відображення статей
function renderArticles(articles) {
  const container = document.getElementById("articles-container");
  container.innerHTML = ""; // Очищаємо контейнер
  articles.forEach((article) => {
    const block = createArticleBlock(article.image, article.title, article.subtitle, `article.html?id=${article.id}`, "Czytaj");
    container.innerHTML += block;
  });
}

// Функція для створення блоку для створення нової статті
function renderNewArticleBlock() {
  const container = document.getElementById("articles-container");

  // Унікальний контент блоку
  const block = createArticleBlock(
    "images/newpost.png", // Шлях до зображення
    "Stwórz swój artykuł", // Заголовок
    "Podziel się swoimi historiami z nami, a my je opublikujemy!", // Підзаголовок
    "https://forms.gle/dYdXxP3dFSv6F8iy7", // Посилання на Google Форму
    "Wypełnij formularz" // Унікальний текст для кнопки
  );

  // Додаємо блок до кінця контейнера
  container.innerHTML += block;
}

// Універсальна функція для створення HTML блоку
function createArticleBlock(image, title, subtitle, link, buttonText) {
  return `
    <div class="article-block">
      <div class="article-image">
        <img src="${image}" alt="${title}">
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










// Пошук і створення випадаючого списку
const searchInput = document.getElementById("search-input");
const suggestions = document.getElementById("suggestions");

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  const filteredArticles = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(query) ||
      (article.subtitle && article.subtitle.toLowerCase().includes(query))
    );
  });

  // Очищуємо та оновлюємо випадаючий список
  suggestions.innerHTML = "";
  if (filteredArticles.length > 0 && query) {
    suggestions.style.display = "block"; // Показуємо список
    filteredArticles.forEach((article) => {
      const li = document.createElement("li");
      li.textContent = `${article.title} - ${article.subtitle}`;
      li.addEventListener("click", () => {
        // Перехід на сторінку статті
        window.location.href = `article.html?id=${article.id}`;
      });
      suggestions.appendChild(li);
    });
  } else {
    suggestions.style.display = "none"; // Ховаємо список, якщо немає результатів
  }
});

// Ховаємо випадаючий список, якщо натиснути поза ним
document.addEventListener("click", (event) => {
  if (!searchInput.contains(event.target) && !suggestions.contains(event.target)) {
    suggestions.style.display = "none";
  }
});
