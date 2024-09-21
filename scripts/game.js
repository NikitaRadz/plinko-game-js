const gameCanvas = document.getElementById('gameCanvas');

// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    World = Matter.World;

// Create an engine
let engine = Engine.create();

// Create a renderer
let render = Render.create({
    element: gameCanvas,
    engine: engine,
    options: {
        width: gameCanvas.clientWidth,
        height: gameCanvas.clientHeight,
        background: "transparent",
        wireframes: true,
        showAngleIndicator: true
    }
});

// Create the game "world"
let world = engine.world;
engine.gravity.y = 0.4

// Objects in game world
let leftWall = Bodies.rectangle(
    (gameCanvas.clientWidth/2)-270,
    gameCanvas.clientHeight/2,
    5,
    400, 
    {isStatic:true}
);
let rightWall = Bodies.rectangle(
    (gameCanvas.clientWidth/2)+270,
    gameCanvas.clientHeight/2,
    5,
    400,
    {isStatic:true}
);
let ground = Bodies.rectangle(
    gameCanvas.clientWidth/2,
    (gameCanvas.clientHeight/2)+200,
    545,
    5,
    {isStatic:true}
);

let ballCollisionGroup = Matter.Body.nextGroup(true);

let pegPyramid = Matter.Composite.create();

createPyramid(
    pegPyramid, 12, 6,30, (gameCanvas.clientWidth/2)+15, (gameCanvas.clientHeight/2)-150
);

// Initial position of peg pyramid
let oldPyramidVector = Matter.Vector.create((gameCanvas.clientWidth/2)+15, (gameCanvas.clientHeight/2)-150);

// Spawns all objects in world
World.add(world,[leftWall,rightWall,ground, pegPyramid]);

// Runs both engine and the renderer
Runner.run(engine);
Render.run(render);

window.addEventListener("resize", () => handleResize(gameCanvas));

/**
 * TODO:
 * - Create ground that the balls can dorp into and be deleted once they hit the multiplier
 */