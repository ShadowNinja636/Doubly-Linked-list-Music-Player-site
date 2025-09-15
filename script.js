class Node{
    constructor(title,artist,src){
        this.data = {title,artist,src};
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.current = null;
        this.length = 0;
    }

    add(title,artist,src){
        const newNode = new Node(title,artist,src);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
            this.current = newNode;
        }
        else{
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }
}


const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const playlistUL = document.getElementById("playlist");

const playlist = new DoublyLinkedList();
playlist.add("Pass aa","Zaeden","audio/Paas Aa - Zaeden.mp3");
playlist.add("Chase Atlantic - Swim(Guitar Cover - Remastered)","Martin","audio/Chase Atlantic - Swim(Guitar Cover - Remastered).mp3");
playlist.add("Is There Someone Else (Remastered - Guitar Cover)","Martin","audio/Is There Someone Else (Remastered - Guitar Cover).mp3");




let isPlaying = false;


function updatePlaylistUI(){
    playlistUL.innerHTML = '';
    let currentNode = playlist.head;

    while(currentNode){
        const li = document.createElement('li');
        li.textContent = `${currentNode.data.title} - ${currentNode.data.artist}`;

        if(currentNode === playlist.current){
            li.classList.add('active');
        }
        playlistUL.appendChild(li);
        currentNode = currentNode.next;
    }
}

function loadSong(songNode){
    songTitle.textContent = songNode.data.title;
    songArtist.textContent = songNode.data.artist;
    audioPlayer.src = songNode.data.src;
    updatePlaylistUI();
}

function playSong(){
    isPlaying = true;
    playBtn.textContent = "Pause";
    audioPlayer.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.textContent = "Play";
    audioPlayer.pause();
}

function playPrevSong(){
    if(playlist.current.prev){
        playlist.current = playlist.current.prev;
        loadSong(playlist.current);
        playSong();
    }
}

function playNextSong(){
    if(playlist.current.next){
        playlist.current = playlist.current.next;
        loadSong(playlist.current);
        playSong();
    }
}

playBtn.addEventListener('click',() =>{
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
});

nextBtn.addEventListener('click',playNextSong);
prevBtn.addEventListener('click',playPrevSong);

audioPlayer.addEventListener('ended',playNextSong());


window.addEventListener('DOMContentLoaded',() => {
    loadSong(playlist.current);
    updatePlaylistUI();
});

