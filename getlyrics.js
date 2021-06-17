
let lastFM_APIkey = "f59b1842961e265d09326395fb461985";
let toptracksAPI = 
    `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=denmark&api_key=${lastFM_APIkey}&format=json`; 
let toptracks; 

//Getting our top tracks
    fetch(toptracksAPI)
    .then(response => response.json())
    .then(function(data){
        let dropdown = document.getElementById("toptracks");
        dropdown.addEventListener('change', getLyrics);
        for (let i = 0; i < data.tracks.track.length; i++) {
            let option = document.createElement('option'); 
            option.innerHTML = data.tracks.track[i].name + " - " + data.tracks.track[i].artist.name; 
            option.setAttribute('id', i);
            dropdown.appendChild(option);
        }
        toptracks = data.tracks.track;
        return toptracks;
        });


function getLyrics(ev){
    
    let index = ev.target[ev.target.selectedIndex].id;
    let artist = toptracks[index].artist.name; 
    let title = toptracks[index].name;
    let lyricsAPI = `https://api.lyrics.ovh/v1/${artist}/${title}`; 
    let lyrics = document.getElementById("lyrics");

    fetch(lyricsAPI, {
        method: 'GET',
        mode: 'no-cors'
    })
    .then(response => response.json())
    .then(function(data){
        lyrics.innerHTML = data.lyrics;
    });
}


