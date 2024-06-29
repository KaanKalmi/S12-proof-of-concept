// Articles inladen met interval
setInterval(function() {
    fetch('/articles')
        .then(response => response.json())
        .then(articles => {
            const articlesContainer = document.getElementsByClassName('news');
            if (articlesContainer.length > 0) {
                while (articlesContainer[0].firstChild) {
                    articlesContainer[0].removeChild(articlesContainer[0].firstChild);
                }
                articles.forEach(article => {
                    const articleElement = document.createElement('article');
                    articleElement.className = 'article';
                    articleElement.innerHTML = `
                        <a href="${article.shareURL}" target="_blank">
                        <figure>
                            <img src="${article.photo.URL}" alt="" height="125" width="125"
                                 srcset="${article.photo.URL}?height=125&width=125" type="image/avif"
                                 srcset="${article.photo.URL}?height=125&width=125" type="image/webp">
                        </figure>
                        <figcaption>
                            <h4> ${article.title} </h4>
                            <small> ${article.author} </small>
                        </figcaption>
                    </a>
                    `;
                    articlesContainer[0].appendChild(articleElement);
                });
            } else {
                console.error('No .news container found');
            }
        });
}, 30 * 60 * 1000 );

// radio
const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause-button");
const volumeControl = document.getElementById("volume-control");
const currentTimeDisplay = document.getElementById("current-time");
let isPlaying = false;

const visibilityToggle = document.getElementsByClassName("hidden")[0];
visibilityToggle.style.display= "block";
audio.style.display='none';

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = "<svg  xmlns='http://www.w3.org/2000/svg'  width='24'  height='24'  viewBox='0 0 24 24'  fill='#FFD200'  stroke='currentColor'  stroke-width='2'  stroke-linecap='round'  stroke-linejoin='round'  class='icon icon-tabler icons-tabler-outline icon-tabler-player-play'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M7 4v16l13 -8z' /></svg>";
    } else {
        audio.play();
        playPauseButton.innerHTML = "<svg  xmlns='http://www.w3.org/2000/svg'  width='24'  height='24' viewBox='0 0 24 24'  fill='#FFD200'  stroke='currentColor'  stroke-width='2'  stroke-linecap='round'  stroke-linejoin='round'  class='icon icon-tabler icons-tabler-outline icon-tabler-player-pause'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' /><path d='M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' /></svg>";
    }
    isPlaying = !isPlaying;
});

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);

    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
});

document.querySelector('#volume-button').addEventListener('click', function() {
    var volumeControlLabel = document.querySelector('#volume-control-label');
    volumeControlLabel.style.display = volumeControlLabel.style.display === 'block' ? 'none' : 'block';
});