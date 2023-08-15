const cvs = document.querySelector("canvas");
const c = cvs.getContext('2d');

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

cvs.addEventListener('resize', function(){
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
    init();
});

cvs.addEventListener('click', function(){
    init();
});

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let gravity = 0.5;
let friction = 0.6;

class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update = () => {
        if (this.y + this.radius + this.dy > cvs.height) {
            this.dy = -this.dy;
            this.dy *= friction;
            this.dx *= friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx >= cvs.width 
            || this.x - this.radius <= 0) {
            this.dx = -this.dx * friction;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let colorArray = ['#F8DE22', '#F94C10', '#C70039', '#900C3F'];
var ballArray = [];
function init() {
    ballArray = [];
    for (var i = 0; i < 250; i ++) {
        let radius = randomIntFromRange(10, 30);
        let x = randomIntFromRange(radius, cvs.width - radius);
        let y = randomIntFromRange(0, cvs.height - radius);
        let dx = randomIntFromRange(-3, 3);
        let dy = randomIntFromRange(-2, 2);
        let color = colorArray[randomIntFromRange(0, colorArray.length)];
        
        var ball = new Ball(x, y, dx, dy, radius, color);
        ballArray.push(ball);
    }
    console.log(ballArray);
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, cvs.width, cvs.height);
    for (var i = 0; i < ballArray.length; i ++) {
        ballArray[i].update();
    }
}

init();
animate();
