const masterplay = document.getElementById('masterplay')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const ProgressBar = document.getElementById('ProgressBar')
const masterSongName = document.getElementById('masterSongName')
const masterSongDetails = document.getElementById('masterSongDetails')
const masterSongImg = document.getElementById('masterSongImg')
let audioElement = new Audio('/songs/10.mp3')
let songIndex = 0;
let SongItom = Array.from(document.getElementsByClassName('SongItom'));
const EndTime = document.getElementById("EndTime")
const StartTime = document.getElementById("StartTime")

let songs = [
    { songName: 'tere hawaale', filePath: 'songs/1.mp3', coverPath: 'covers/cover1.jpg', songDetails: 'Laal Singh Chaddha' },
    { songName: 'Kesariya', filePath: 'songs/2.mp3', coverPath: 'covers/cover3.jpg', songDetails: 'Brahmastra' },
    { songName: 'Kahani', filePath: 'songs/3.mp3', coverPath: 'covers/cover2.jpg', songDetails: 'Laal Singh Chaddha' },
    { songName: 'Maan Meri Jaan', filePath: 'songs/4.mp3', coverPath: 'covers/cover4.jpg', songDetails: 'Performing Artist: King' },
    { songName: 'Malang Sajna', filePath: 'songs/5.mp3', coverPath: 'covers/cover5.jpg', songDetails: 'Malang Sajna' },
    { songName: 'Ram Siya Ram', filePath: 'songs/6.mp3', coverPath: 'covers/cover6.jpg', songDetails: 'Adipurush' },
    { songName: 'Tere Pyar Mein', filePath: 'songs/7.mp3', coverPath: 'covers/cover7.jpg', songDetails: 'Tu Jhooti Main Makkar' },
    { songName: 'Phir Aur Kya Chahiye', filePath: 'songs/8.mp3.jpg', coverPath: 'covers/cover8.jpg', songDetails: 'Zara Hatke Zara Bachke' },
    { songName: 'Ramuloo Ramula', filePath: 'songs/9.mp3.jpg', coverPath: 'covers/cover9.jpg', songDetails: 'Ala Vaikuntapuramlo' },
    { songName: 'Buttabomma', filePath: 'songs/10.mp3.jpg', coverPath: 'covers/cover10.jpg', songDetails: 'Ala Vaikuntapuramlo' },
    { songName: 'Inthandham', filePath: 'songs/11.mp3.jpg', coverPath: 'covers/cover11.jpg', songDetails: 'Seeta Ramana' },
    { songName: 'Oo Antava Oo', filePath: 'songs/12.mp3.jpg', coverPath: 'covers/cover12.jpg', songDetails: 'Pushpa' },

]

// showing the images , songaname, songDetails 

SongItom.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
    element.getElementsByClassName('songDetails')[0].innerText = songs[i].songDetails
});


// click and play song 

masterplay.addEventListener('click', () => {
    // console.log('clicked')
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');

    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');

    }
})


//this is for time and duration on progressBar

audioElement.addEventListener('timeupdate', () => {

    setTimeout(() => {
        
        ProgressBar.max = audioElement.duration
        EndTime.innerHTML = formatTime(audioElement.duration)
        console.log(audioElement.duration)
            

    },300);
   
})

// Formating the Time in Minute and Seconds

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10 ){
        min = `0${min}`;

    }
    let sec = Math.floor(time % 60 );
    if(sec < 10){
        sec = ` 0${sec}`;
    }
    return `${min} : ${sec}`
}

// updating time 

setInterval(() => {
    StartTime.innerHTML = formatTime(audioElement.currentTime)
    ProgressBar.value = audioElement.currentTime
    if(Math.floor(audioElement.currentTime) == Math.floor(ProgressBar.max)){
        next.click();
    }
}, 500);


ProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ProgressBar.value 
   

})



// Adjust Volume

let volumeBar = document.getElementById('volume-bar')

volumeBar.addEventListener("input", (e) => {
    volumeProgress = e.target.value
    audioElement.volume = e.target.value / 100
})



const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItomPlay')).forEach((element) => {

        element.classList.add('fa-play-circle')
        element.classList.remove('fa-pause-circle')

    })
}

Array.from(document.getElementsByClassName('songItomPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();

        songIndex = parseInt(e.target.id);
        //    console.log(songIndex)
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src = `songs/${songIndex + 1}.mp3`
        masterSongName.innerText = songs[songIndex].songName;
        masterSongDetails.innerText = songs[songIndex].songDetails;
        masterSongImg.src = songs[songIndex].coverPath
        audioElement.currentTime = 0
        audioElement.play()
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        
       
    })
})


next.addEventListener('click', () => {
    if (songIndex >= 11) {
        songIndex = 0
    }
    else {
        songIndex += 1
    }
    audioElement.currentTime = 0;
    audioElement.src = `songs/${songIndex + 1}.mp3`
    masterSongName.innerText = songs[songIndex].songName;
    masterSongDetails.innerText = songs[songIndex].songDetails;
    masterSongImg.src = songs[songIndex].coverPath
    audioElement.play()
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})


prev.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 11
    }
    else {
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`
    masterSongName.innerText = songs[songIndex].songName;
    masterSongDetails.innerText = songs[songIndex].songDetails;
    masterSongImg.src = songs[songIndex].coverPath
    audioElement.currentTime = 0;
    audioElement.play()
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})

const Like = document.getElementById("Like")
Like.style.color = "red"

Like.addEventListener("click", () =>{
    console.log("clicked")
    
    if(Like.style.color == "red"){
        Like.style.color = "white"
    } 
    else{
        Like.style.color = "red"
    }
    
})




