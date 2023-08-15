const cvs = document.querySelector("canvas");
const c = cvs.getContext("2d");
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

//set width and height whenever user resizes the website.
window.addEventListener('resize', function(){
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
});

//get position of mouse.
let mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});


class Shape {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.initialY = y;
    };

    draw = () => {

    };

    update = () => {

    };
}

class Line {
    constructor(x, y, offset){
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.initialY = y;
        this.offset = offset; //define distance between lines.
        this.radians = 0; //define the angle of motion.
        this.velocity = 0.01; //define the speed of movement.
    }

    draw = () => {
        c.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        c.fillStyle = 'rgba(255, 255, 255, 0.3)';


        const drawLinePath = (width = 0, color) => {
            c.beginPath();
            c.moveTo(this.x - (width / 2), this.y + (width / 2));
            c.lineTo(this.x - (width / 2) + 300, this.y - (width / 2) - 1000);
            c.lineTo(this.x + (width / 2) + 300, this.y - (width / 2) - 1000);
            c.lineTo(this.x + (width / 2), this.y - (width / 2));
            c.closePath();
            if (c.isPointInPath(mouse.x, mouse.y) && color) {
                c.strokeStyle = color;
            };
        };

        drawLinePath(150, '#baf2ef');
        drawLinePath(50, '#dcf3ff');

        c.beginPath();
        c.arc(this.x, this.y, 0, Math.PI*2, true);
        c.fill();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x + 300, this.y - 1000);
        c.stroke();
        c.closePath();

        this.update();
    };

    update = () => {
        this.radians += this.velocity;
        this.y = this.y + Math.cos(this.radians + this.offset);
    }
}



var lines = [];
for (var i = 0; i < 100; i ++) {
    const start = {x: -250, y: 800};
    const unit = 25;

    var newLine = new Line(start.x + unit * i, start.y - i * 3 + Math.sin(i) * unit, 0.1 + (1 * i));
    lines.push(newLine);
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    for (var i = 0; i < lines.length; i ++){
        lines[i].draw();
    }
   
};

animate();


// c.fillRect(50, 50, 100, 100);
// c.clearRect(75, 75, 50, 50);
// c.strokeRect(200, 100, 100, 100);

// c.beginPath();
// c.moveTo(300, 300);
// c.lineTo(200, 25);
// c.lineTo(300, 75);
// c.lineTo(300, 300);
// c.stroke();
// c.fill();

// c.beginPath();
// c.arc(500, 500, 50, 0, Math.PI*2, true);
// c.fill();

// c.beginPath();
// c.quadraticCurveTo(60, 120, 65, 100);
// c.stroke()