
        // Завантаження даних з gallery.json
        fetch('gallery.json')
            .then(response => response.json())
            .then(data => {
                const urlParams = new URLSearchParams(window.location.search);
                const albumId = urlParams.get('album');
                const numericAlbumId = parseInt(albumId.replace('album_', ''), 10);
    
                const albumData = data.find(album => album.id === numericAlbumId);
    
                if (!albumData) {
                    document.querySelector('.album-container').innerHTML = '<p>Nie udało się załadować albumu.</p>';
                    return;
                }
    
                document.getElementById('album-title').textContent = albumData.title;
                document.getElementById('album-description').textContent = albumData.subtitle;
    
                const photos = albumData.photos || [];
                const container = document.querySelector('.gallery-container');
                const loadMoreButton = document.getElementById('load-more-button');
                const loadingText = document.getElementById('loading-text');
                let loadedPhotos = 0;
                const photosPerLoad = 12;
    
                function loadMorePhotos() {
                    loadingText.style.display = 'block';
                    loadMoreButton.style.display = 'none';
                
                    const photosToLoad = photos.slice(loadedPhotos, loadedPhotos + photosPerLoad);
                    photosToLoad.forEach(photo => {
                        const photoElement = document.createElement('div');
                        photoElement.className = 'photo';
                        photoElement.innerHTML = `
                            <a href="${photo}" class="lightbox">
                                <img src="${photo}" alt="Photo">
                            </a>
                        `;
                        container.appendChild(photoElement);
                
                        // Додаємо плавну анімацію
                        setTimeout(() => {
                            photoElement.classList.add('visible');
                        }, 100);
                    });
                
                    baguetteBox.run('.gallery-container', { animation: 'fadeIn' });
                
                    loadedPhotos += photosToLoad.length;
                    loadingText.style.display = 'none';
                
                    if (loadedPhotos >= photos.length) {
                        loadMoreButton.style.display = 'none';
                        window.removeEventListener('scroll', handleScroll);
                    } else {
                        loadMoreButton.style.display = 'block';
                    }
                }
                
    
                function handleScroll() {
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                const scrollPercentage = (scrollTop + clientHeight) / scrollHeight * 100;
                
                if (scrollPercentage >= 80) { // Якщо прокручено 80% сторінки
                    loadMorePhotos();
                }
            }

            loadMoreButton.addEventListener('click', loadMorePhotos);
            window.addEventListener('scroll', handleScroll);

            loadMorePhotos(); // Завантажити першу порцію
            })
            .catch(error => {
                console.error('Nie udało się załadować albumu:', error);
                document.querySelector('.album-container').innerHTML = '<p>Nie udało się załadować albumu.</p>';
            });
    