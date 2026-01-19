
// Init Canvas 
const canvas = document.getElementById("canvas");
const W = window.innerWidth;
const H = window.innerHeight;
canvas.width = W;
canvas.height = H;

// Cavnas Context --> 2d drawing 
const ctx = canvas.getContext("2d");

// Canvas Colors
const BACKGROUND = "white";
const FOREGROUND = "black";

function clear() {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, W, H);
}

// ------------------------------------
// Points
// -----------------------------------
const size = 5;

// create point
function point(x, y, z) {
    return {
        x,
        y, 
        z,
    }
}

// Transform Point 3D --> 2D
function project({x, y, z}) {
    return {
        x: x/z,
        y: y/z,
     }
}

// Convert Coords
function toScreen({x, y}) {
    // Transform 2D cords to html Canvas...
    // x: [-1, 1] -> [0, 2] -> [0, 1] -> [0, W]
    // y: [-1, 1] -> [0, 2] -> [0, 1] -> [0, H]
    return {
        x: (x + 1) / 2 * W,
        y: (1 - y) / 2 * H,
    }
}

// Wrap the helper functions
function draw({x, y, z}) {
    console.log(x, y, z)
    let p = toScreen(project(point(x, y, z)));

    ctx.fillStyle = FOREGROUND;
    ctx.fillRect((p.x - size/2), (p.y - size/2), size, size); 
}

// -----------------------------------------------
// Animation
// -----------------------------------------------
const FPS = 10
function frame(points) {
    clear();
    points.forEach(p => draw(p));
    console.log("new frame")
}

function animate(points, transformations) {
    setInterval(() => {
        points = points.map(p => // map the following func over each point
            transformations.reduce((acc, f) => f(acc), p) // reduce the [] of transformation by reducing (applying them onto the point, p.
        );
        frame(points);
    }, 1000/FPS)
}

// explicity currying of lambdas
const rotateY = (theta) => (p) => {
    return {
        x: (p.x * Math.cos(theta)) + (p.z * Math.sin(theta)), 
        y: p.y, 
        z: (p.x * -Math.sin(theta)) + (p.z * Math.cos(theta)), 
    }
}

const translate = (dx, dy, dz) => (p) => {
    return {
        x: p.x + dx,
        y: p.y + dy,
        z: p.z + dz,
    }
}




// --------------------------------------------------
// Demo
// --------------------------------------------------
let s = 0.1
let cube = [
    {x: s, y: s, z: s},
    {x: -s, y: s, z: s},
    {x: -s, y: -s, z: s},
    {x: s, y: -s, z: s},

    {x: s, y: s, z: -s},
    {x: -s, y: s, z: -s},
    {x: -s, y: -s, z: -s},
    {x: s, y: -s, z: -s},
]

animate(cube, [rotateY(0.1), translate(0, 0, 0.1)]);





