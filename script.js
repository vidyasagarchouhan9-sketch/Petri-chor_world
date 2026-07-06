fetch("notice.html")
.then(response => response.text())
.then(html => {

    const parser = new DOMParser();
    const doc = parser.parseFromString(html,"text/html");

    const total = doc.querySelectorAll(".notice").length;

    const lastSeen = Number(localStorage.getItem("lastSeen")) || 0;

    const badge = document.getElementById("badge");

    if(total > lastSeen){
        badge.textContent = total - lastSeen;
        badge.style.display = "flex";
    }

});


