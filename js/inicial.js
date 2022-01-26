function emojicon() {

    if (emoji2.style.display=="block") {

        emoji.style.display = "block";
        emoji2.style.display = "none";
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("theme","dark");

    }
    else {

        emoji.style.display = "none";
        emoji2.style.display = "block"
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme","light");

    }
}
window.onload = checkTheme();
function checkTheme(){
    let localStorageTheme = localStorage.getItem("theme");
    if(localStorageTheme != null && localStorageTheme === "dark"){

        document.body.className = localStorageTheme;
        emoji.style.display = "block";
        emoji2.style.display = "none";

    }
    else{

        document.body.className = localStorageTheme;
        emoji2.style.display = "block";
        emoji.style.display = "none";

    }
}