const audio = document.querySelector(".audio");
const coverImg = document.querySelector(".cover__img");
const playButton = document.querySelector(".btn-play");
const playButtonImg = document.querySelector(".btn-play>img");
const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");
const progressBar = document.getElementById('progress-bar');
const timeCurrent = document.querySelector(".time__current");
const timeDuration = document.querySelector(".time__all");


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

function getTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds - minutes * 60);
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    return `${minutes}:${seconds}`;
}

function setSong(ind) {
    document.querySelector(".song__author").innerHTML = songs[ind].author;
    document.querySelector(".song__title").innerHTML = songs[ind].title;
    coverImg.src = `assets/img/${songs[ind].img}`;
    document.querySelector(".blur").style.backgroundImage = `url(assets/img/${songs[ind].img})`;
    audio.src = `assets/audio/${songs[ind].song}`;
    audio.onloadedmetadata = () => {
        let duration = audio.duration;
        timeDuration.innerHTML = getTime(duration);
    };
}

setSong(currentSong);

function play() {
    audio.classList.add('play');
    audio.play();
    playButtonImg.src = 'assets/svg/pause.png';
    coverImg.classList.add('active');
    coverImg.classList.remove('inactive');
}

function pause() {
    audio.classList.remove('play');
    audio.pause();
    playButtonImg.src = 'assets/svg/play.png';
    coverImg.classList.add('inactive');
    coverImg.classList.remove('active');
}

playButton.addEventListener('click', () => {
    if (audio.classList.contains('play')) {
        pause();
    } else {
        play();
    }
})

function next() {
    currentSong++;
    if (currentSong > songs.length - 1) currentSong = 0;
    setSong(currentSong);
    play();
}
nextButton.addEventListener('click', next)

function prev() {
    currentSong--;
    if (currentSong < 0) currentSong = songs.length - 1;
    setSong(currentSong);
    play();
}

prevButton.addEventListener('click', prev)

function progress(e) {
    const {duration, currentTime} = e.target;
    let progress = currentTime / duration * 100;
    progressBar.value = progress ? progress : 0;
    let time = currentTime ? currentTime : 0;
    timeCurrent.innerHTML = getTime(time);
}

audio.addEventListener('timeupdate', progress)

function setTime(val) {
    let duration = audio.duration;
    let time = val / 100 * duration;
    audio.currentTime = time;
    timeCurrent.innerHTML = getTime(time);
}

audio.addEventListener('ended', next);