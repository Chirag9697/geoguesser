import { createContainer } from './container.js'

const textBox = document.querySelector('.text');
const captions = ["In the vastness of space, our astronaut embarks on a crucial mission to save humanity.",
    "Suddenly, a catastrophic encounter with space debris throws our ship off course!",
    "The astronaut gazes into the void, a cracked window revealing the perilous state of the spacecraft",
    "The once-majestic ship now drifts aimlessly, battered and bruised by the unforgiving cosmos.",
    "Faced with imminent peril, our hero realizes the navigation system must be recalibrated to bring the mission back on course.",
];


//image change animations

const wrapper = document.querySelector('.container-wrapper');
let container = createContainer(1, -200, 200);
wrapper.appendChild(container);
updateText(0);

let i = 1;

let id = setInterval(() => {
    if (i == 5) {
        wrapper.removeChild(container);
        let captions = document.querySelector('.captions');
        captions.removeChild(textBox);

        captions.innerHTML = `
        <section class="typing-container">
        <p> <span class="typing-text"></span></p>
      </section>
  
                `;
        const imageUrl = './images/spritesheet.png';
        const image = new Image();

        image.onload = () => {
            const width = image.naturalWidth / 2;
            const height = image.naturalHeight / 1;

            const canvasEl = document.getElementById('aiAnimation');
            const ctx = canvasEl.getContext('2d');

            canvasEl.width = width;
            canvasEl.height = height;

            const imageCount = 2; // Number of images in the spritesheet
            let currentImage = 0;

            const frameRate = 6; // Frames per second
            const frameDuration = 1000 / frameRate; // Duration of each frame in milliseconds

            let animationRunning = true;

            function draw() {
                if (!animationRunning) {
                    // Display still image of the first frame
                    ctx.clearRect(0, 0, width, height);
                    ctx.drawImage(image, 0, 0, width, height, 0, 0, width, height);
                    return;
                }

                const x = currentImage * width;
                const y = 0;

                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

                setTimeout(() => {
                    currentImage = (currentImage + 1) % imageCount;
                    requestAnimationFrame(draw);
                }, frameDuration);
            }

            // Function to stop the animation
            function stopAnimation() {
                animationRunning = false;
            }

            // Function to start the animation
            function startAnimation() {
                animationRunning = true;
                draw();
            }

            // Example: Call stopAnimation() to stop the animation
            // Uncomment the line below to stop the animation after 3 seconds
            // setTimeout(stopAnimation, 3000);

            // Example: Call startAnimation() to start the animation
            // Uncomment the line below to start the animation after 3 seconds
            // setTimeout(startAnimation, 3000);

            // Start the animation by default
            startAnimation();
        };

        image.src = imageUrl;

        

        clearInterval(id);
    }
    else {
        console.log(i);
        let containerOld = container;
        container = createContainer(i + 1, -200, 200);
        wrapper.appendChild(container);
        wrapper.removeChild(containerOld);
        updateText(i);
        i = (i) + 1;
    }
}, 5000)




//text animations

var j = 0;
var speed = 25;
var timeoutId;

function updateText(i) {
    textBox.innerHTML = "";
    var txt = captions[i];
    if (timeoutId) clearTimeout(timeoutId);
    j = 0;
    typeWriter(txt)
}

function typeWriter(txt) {
    if (j < txt.length) {
        textBox.innerHTML += txt.charAt(j);
        j++;
        timeoutId = setTimeout(typeWriter, speed, txt);
    }
}

//parallax for text

var currentX = window.innerWidth / 2;
var currentY = window.innerHeight / 2;
var movementConstant = 0.05;

document.addEventListener('mousemove', function (e) {
    var xdiff = e.pageX - currentX;
    currentX = e.pageX;
    var ydiff = e.pageY - currentY;
    currentY = e.pageY;

    var movementx = (xdiff * movementConstant);
    var movementy = 2 * (ydiff * movementConstant);

    // Apply parallax effect
    textBox.style.transform = "translate(" + movementx + "px, " + movementy + "px) scale(1.05)";
});

