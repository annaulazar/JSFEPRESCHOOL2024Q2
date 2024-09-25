const audio = document.querySelector(".audio");
const playButton = document.querySelector(".btn-play");
const playButtonImg = document.querySelector(".btn-play>img");
const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");

const songs = [
    {
        author: 'Beyonce',
        title: "Don't Hurt Yourself",
        img: 'lemonade.png',
        song: 'beyonce.mp3'
    },
    {
        author: 'Dua Lipa',
        title: "Don't Start Now",
        img: 'dontstartnow.png',
        song: 'dontstartnow.mp3'
    }
]
let currentSong = 0;

function setSong(ind) {
    document.querySelector(".song__author").innerHTML = songs[ind].author;
    document.querySelector(".song__title").innerHTML = songs[ind].title;
    document.querySelector(".cover__img").src = `assets/img/${songs[ind].img}`;
    document.querySelector(".blur").style.backgroundImage = `url(assets/img/${songs[ind].img})`;
    audio.src = `assets/audio/${songs[ind].song}`;
}

setSong(currentSong);

function play() {
    audio.classList.add('play');
    audio.play();
    playButtonImg.src = 'assets/svg/pause.png'
}

function pause() {
    audio.classList.remove('play');
    audio.pause();
    playButtonImg.src = 'assets/svg/play.png';
}

playButton.addEventListener('click', () => {
    if (audio.classList.contains('play')) {
        pause();
    } else {
        play();
    }
})

prevButton.addEventListener('click', () => {
    currentSong++;
    if (currentSong > songs.length - 1) currentSong = 0;
    setSong(currentSong);
    play();
})

nextButton.addEventListener('click', () => {
    currentSong--;
    if (currentSong < 0) currentSong = songs.length - 1;
    setSong(currentSong);
    play();
})