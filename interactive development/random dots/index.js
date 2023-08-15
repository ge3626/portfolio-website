const cvs = document.querySelector("canvas");
const c = cvs.getContext("2d");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

window.addEventListener('resize', function () {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
});

var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y ;
});

let maxRadius = 40;
class randomDots {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = color;
    }

    draw = () => {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update = () => {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        } else if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 3; 
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}


var dotArray = [];
for (var i = 0; i < 2000; i ++){
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    var radius = Math.random () * 3 + 1;
    let colorArray = ['#C5DFF8', '#FFDDCC', '#FFCCCC', '#FEBBCC'];
    var color = colorArray[Math.floor(Math.random() * colorArray.length)];
    // let color = "blue";

    var dot = new randomDots(x, y, dx, dy, radius, color);
    dotArray.push(dot);
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < dotArray.length; i ++) {
        dotArray[i].update();
    }
}

animate();