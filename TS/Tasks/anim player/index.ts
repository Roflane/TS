let paused: boolean = false;
let frameInterval: number | null = null;
let currentFrame = 1;
const maxFrame = 28;
let imageName = "images/player/Claymore_Ice";


function playFrames() {
    const image = document.getElementById("mw-image") as HTMLImageElement;
    if (!image) return;
    if (frameInterval !== null) return;
    if (!imageName) {
        const src = image.src;
        const match = src.match(/(.*?)(\d+)\.png$/);
        if (!match) return;
        imageName = match[1];
        currentFrame = Number(match[2]);
    }

    frameInterval = setInterval(() => {
        if (!paused) {
            image.src = `${imageName}${currentFrame}.png`;

            if (currentFrame < maxFrame) currentFrame++;
            else currentFrame = 1;
        }
    }, 16 * (60 / maxFrame));
}


function stopFrames() {
    if (frameInterval !== null) {
        clearInterval(frameInterval);
        frameInterval = null;
    }
}


function switchImage() {
    const play: HTMLImageElement = document.getElementById("mw-play-img") as HTMLImageElement;
    if (!play) return;

    paused = !paused;
    play.src = paused ? "images/ui/play.png" : "images/ui/pause.png";

    if (paused) {
        stopFrames();
    } else {
        playFrames();
    }
}


function bindPlayButton() {
    const play = document.getElementById("mw-play");
    if (!play) return;

    play.onclick = switchImage;
}

function bindFastBackwardButton() {
    const image = document.getElementById("mw-image") as HTMLImageElement;
    if (!image) return;
    const backward = document.getElementById("mw-fast-backward") as HTMLImageElement;
    if (!backward) return;

    backward.onclick = () => {
        currentFrame = 1;
        image.src = `${imageName}${currentFrame}.png`;
    };
}

function bindFastForwardButton() {
    const image = document.getElementById("mw-image") as HTMLImageElement;
    if (!image) return;
    const forward = document.getElementById("mw-fast-forward") as HTMLImageElement;
    if (!forward) return;

    forward.onclick = () => {
        currentFrame = maxFrame;
        image.src = `${imageName}${currentFrame}.png`;
    };
}


function bindBackButton() {
    const image = document.getElementById("mw-image") as HTMLImageElement;
    if (!image) return;
    const forward = document.getElementById("mw-back") as HTMLImageElement;
    if (!forward) return;

    forward.onclick = () => {
        if (currentFrame > 1 && currentFrame < maxFrame) {
            --currentFrame
            image.src = `${imageName}${currentFrame}.png`;
        }
    };
}

function bindNextButton() {
    const image = document.getElementById("mw-image") as HTMLImageElement;
    if (!image) return;
    const forward = document.getElementById("mw-next") as HTMLImageElement;
    if (!forward) return;

    forward.onclick = () => {
        if (currentFrame < maxFrame) {
            ++currentFrame
            image.src = `${imageName}${currentFrame}.png`;
        }
    };
}


(() => {
    bindPlayButton();
    bindFastBackwardButton();
    bindFastForwardButton();
    bindBackButton();
    bindNextButton();
})();
