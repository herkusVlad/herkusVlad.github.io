function save(audio) {
    localStorage["javatris.username"] = document.getElementById("login_name").value;
    if(!audio.paused && !audio.ended){
        audio.pause();
    }
}

function load() {
    let text = localStorage.getItem("javatris.username");
    if (text === "" || text === null) {
        return "";
    }
    return text;
}