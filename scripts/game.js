const gameCanvas = document.getElementById('gameCanvas');
let gameWidth = gameCanvas.clientWidth;
let gameHeight = gameCanvas.clientHeight;

// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    World = Matter.World;

// Create an engine
let engine = Engine.create();

// Create a renderer
let render = Render.create({
    element: gameCanvas,
    engine: engine,
    options: {
        width: gameWidth,
        height: gameHeight,
        background: "transparent",
        wireframes: true,
        showAngleIndicator: true
    }
});

// Create the game "world"
let world = engine.world;

// Objects in game world
let circleA = Bodies.circle(500 ,500 ,30);
let leftWall = Bodies.rectangle(gameWidth/4 ,
    gameHeight/2,
    5,
    gameHeight*0.7, 
    {isStatic:true});
let rightWall = Bodies.rectangle((gameWidth/4)*3,
    gameHeight/2,
    5,
    gameHeight*0.7,
    {isStatic:true});

// Spawns all objects in world
World.add(world,[circleA,leftWall,rightWall]);

// Runs both engine and the renderer
Runner.run(engine);
Render.run(render);

function handleResize(gameCanvas) {
    // set game canvas to new values according to change in screen size
    render.canvas.width = gameCanvas.clientWidth;
    render.canvas.height = gameCanvas.clientHeight;

    // Change position of walls according to resize as well below
}

window.addEventListener("resize", () => handleResize(gameCanvas));