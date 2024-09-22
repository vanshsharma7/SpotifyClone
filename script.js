console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Acoustic Breeze", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "City Scape", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Dreams", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Inspire", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Enjoy", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Source", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Stone", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Mansion", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Rocky", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Rain", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
    { songName: "Silence", filePath: "songs/11.mp3", coverPath: "covers/11.jpg" }
];

// Update song items with cover images and names
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songItemPlay")[0].id = i; // Assign unique IDs for play buttons
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('loadedmetadata', () => {
    // Set total duration when the metadata is loaded
    duration.innerText = formatTime(audioElement.duration);
});

audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    // Update current time display
    currentTime.innerText = formatTime(audioElement.currentTime);
});

// Format time function
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format as mm:ss
}


// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Update current time based on progress bar
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Function to reset play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Play a specific song when its play button is clicked
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Next song button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Previous song button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? 0 : songIndex - 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
